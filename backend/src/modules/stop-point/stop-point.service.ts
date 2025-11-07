import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { StopPointRepository } from './stop-point.repository';
import { CreateStopPointDto } from './dto/create-stop-point.dto';
import { UpdateStopPointDto } from './dto/update-stop-point.dto';
import { StopPointResponseDto } from './dto/stop-point-response.dto';
import { QueryStopPointDto } from './dto/query-stop-point.dto';
import { PaginatedQueryStopPointDto } from './dto/paginated-query-stop-point.dto';
import { Prisma } from '@prisma/client';
import { PageableStopPointResponseDto } from './dto/pageable-stop-point-response.dto';

@Injectable()
export class StopPointService {
  constructor(private readonly stopPointRepository: StopPointRepository) {}

  async create(createStopPointDto: CreateStopPointDto): Promise<StopPointResponseDto> {
    const stopPoint = await this.stopPointRepository.create({
      name: createStopPointDto.name,
      address: createStopPointDto.address,
      latitude: createStopPointDto.latitude,
      longitude: createStopPointDto.longitude,
    });
    return StopPointResponseDto.fromStopPoint(stopPoint);
  }

  async findAll(query: QueryStopPointDto): Promise<StopPointResponseDto[]> {
    const filter = this.buildFilter(query);
    const stopPoints = await this.stopPointRepository.findByFilter(filter);
    return stopPoints.map(StopPointResponseDto.fromStopPoint);
  }

  async findAllWithPagination(
    query: PaginatedQueryStopPointDto,
  ): Promise<PageableStopPointResponseDto> {
    const { page, limit, sortBy, sortOrder, ...filterData } = query;
    const filter = this.buildFilter(filterData);
    const pagination = { page, limit, sortBy, sortOrder };

    const result = await this.stopPointRepository.findByFilterWithPagination(
      filter,
      pagination,
    );

    return {
      ...result,
      data: result.data.map(StopPointResponseDto.fromStopPoint),
    };
  }

  async findOne(id: number): Promise<StopPointResponseDto> {
    const stopPoint = await this.stopPointRepository.findById(id);
    if (!stopPoint) {
      throw new NotFoundException(`StopPoint with ID ${id} not found`);
    }
    return StopPointResponseDto.fromStopPoint(stopPoint);
  }

  async update(id: number, updateStopPointDto: UpdateStopPointDto): Promise<StopPointResponseDto> {
    const stopPoint = await this.stopPointRepository.findById(id);
    if (!stopPoint) {
      throw new NotFoundException(`StopPoint with ID ${id} not found`);
    }

    const updatedStopPoint = await this.stopPointRepository.update(id, {
      name: updateStopPointDto.name,
      address: updateStopPointDto.address,
      latitude: updateStopPointDto.latitude,
      longitude: updateStopPointDto.longitude,
    });
    return StopPointResponseDto.fromStopPoint(updatedStopPoint);
  }

  async remove(id: number): Promise<void> {
    const stopPoint = await this.stopPointRepository.findById(id);
    if (!stopPoint) {
      throw new NotFoundException(`StopPoint with ID ${id} not found`);
    }
    await this.stopPointRepository.delete(id);
  }

  private buildFilter(query: QueryStopPointDto): Prisma.StopPointWhereInput {
    const filter: Prisma.StopPointWhereInput = {};

    if (query.name) {
      filter.name = { contains: query.name, mode: 'insensitive' };
    }

    if (query.address) {
      filter.address = { contains: query.address, mode: 'insensitive' };
    }

    return filter;
  }
}
