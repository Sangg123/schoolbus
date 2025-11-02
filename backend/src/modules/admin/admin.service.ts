import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminResponseDto } from './dto/admin-response.dto';
import { QueryAdminDto } from './dto/query-admin.dto';
import { PaginatedQueryAdminDto } from './dto/paginated-query-admin.dto';
import { Prisma } from '@prisma/client';
import { PageableAdminResponseDto } from './dto/pageable-admin-response.dto';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

  async create(createAdminDto: CreateAdminDto): Promise<AdminResponseDto> {
    // Use Prisma relation connect syntax
    const admin = await this.adminRepository.create({
      user: {
        connect: {
          id: createAdminDto.userId,
        },
      },
    });
    return AdminResponseDto.fromAdmin(admin);
  }

  async findAll(query: QueryAdminDto): Promise<AdminResponseDto[]> {
    const filter = this.buildFilter(query);
    const admins = await this.adminRepository.findByFilter(filter);
    return admins.map(AdminResponseDto.fromAdmin);
  }

  async findAllWithPagination(
    query: PaginatedQueryAdminDto,
  ): Promise<PageableAdminResponseDto> {
    const { page, limit, sortBy, sortOrder, ...filterData } = query;
    const filter = this.buildFilter(filterData);
    const pagination = { page, limit, sortBy, sortOrder };

    const result = await this.adminRepository.findByFilterWithPagination(
      filter,
      pagination,
    );

    return {
      ...result,
      data: result.data.map(AdminResponseDto.fromAdmin),
    };
  }

  async findOne(id: number): Promise<AdminResponseDto> {
    const admin = await this.adminRepository.findById(id);
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    return AdminResponseDto.fromAdmin(admin);
  }

  async update(
    id: number,
    updateAdminDto: UpdateAdminDto,
  ): Promise<AdminResponseDto> {
    const admin = await this.adminRepository.findById(id);
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }

    const updatedAdmin = await this.adminRepository.update(id, {
      user: {
        connect: {
          id: updateAdminDto.userId,
        },
      },
    });
    return AdminResponseDto.fromAdmin(updatedAdmin);
  }

  async remove(id: number): Promise<void> {
    const admin = await this.adminRepository.findById(id);
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    await this.adminRepository.delete(id);
  }

  private buildFilter(query: QueryAdminDto): Prisma.AdminWhereInput {
    const filter: Prisma.AdminWhereInput = {};

    if (query.userId) {
      filter.userId = query.userId;
    }

    return filter;
  }
}
