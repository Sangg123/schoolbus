import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { DriverRepository } from './driver.repository';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { DriverResponseDto } from './dto/driver-response.dto';
import { QueryDriverDto } from './dto/query-driver.dto';
import { PaginatedQueryDriverDto } from './dto/paginated-query-driver.dto';
import { Prisma } from '@prisma/client';
import { PageableDriverResponseDto } from './dto/pageable-driver-response.dto';

@Injectable()
export class DriverService {
  constructor(private readonly driverRepository: DriverRepository) {}

  async create(createDriverDto: CreateDriverDto): Promise<DriverResponseDto> {
    const driver = await this.driverRepository.create({
      user: {
        connect: {
          id: createDriverDto.userId,
        },
      },
      citizenId: createDriverDto.citizenId,
      licenseId: createDriverDto.licenseId,
    });
    return DriverResponseDto.fromDriver(driver);
  }

  async findAll(query: QueryDriverDto): Promise<DriverResponseDto[]> {
    const filter = this.buildFilter(query);
    const drivers = await this.driverRepository.findByFilter(filter);
    return drivers.map(DriverResponseDto.fromDriver);
  }

  async findAllWithPagination(
    query: PaginatedQueryDriverDto,
  ): Promise<PageableDriverResponseDto> {
    const { page, limit, sortBy, sortOrder, ...filterData } = query;
    const filter = this.buildFilter(filterData);
    const pagination = { page, limit, sortBy, sortOrder };

    const result = await this.driverRepository.findByFilterWithPagination(
      filter,
      pagination,
    );

    return {
      ...result,
      data: result.data.map(DriverResponseDto.fromDriver),
    };
  }

  async findOne(id: number): Promise<DriverResponseDto> {
    const driver = await this.driverRepository.findById(id);
    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
    return DriverResponseDto.fromDriver(driver);
  }

  async update(
    id: number,
    updateDriverDto: UpdateDriverDto,
  ): Promise<DriverResponseDto> {
    const driver = await this.driverRepository.findById(id);
    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }

    const updatedDriver = await this.driverRepository.update(id, {
      user: updateDriverDto.userId ? {
        connect: {
          id: updateDriverDto.userId,
        },
      } : undefined,
      citizenId: updateDriverDto.citizenId,
      licenseId: updateDriverDto.licenseId,
    });
    return DriverResponseDto.fromDriver(updatedDriver);
  }

  async remove(id: number): Promise<void> {
    const driver = await this.driverRepository.findById(id);
    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
    await this.driverRepository.delete(id);
  }

  private buildFilter(query: QueryDriverDto): Prisma.DriverWhereInput {
    const filter: Prisma.DriverWhereInput = {};

    if (query.userId) {
      filter.userId = query.userId;
    }

    if (query.citizenId) {
      filter.citizenId = { contains: query.citizenId, mode: 'insensitive' };
    }

    if (query.licenseId) {
      filter.licenseId = { contains: query.licenseId, mode: 'insensitive' };
    }

    if (query.user) {
      filter.user = {
        OR: [
          { email: { contains: query.user, mode: 'insensitive' } },
          { fullName: { contains: query.user, mode: 'insensitive' } },
          { phone: { contains: query.user } },
        ],
      };
    }

    return filter;
  }
}
