import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateParentDto } from './dto/create-parent.dto';
import { PageableParentResponseDto } from './dto/pageable-parent-response.dto';
import { PaginatedQueryParentDto } from './dto/paginated-query-parent.dto';
import { ParentResponseDto } from './dto/parent-response.dto';
import { QueryParentDto } from './dto/query-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { ParentRepository } from './parent.repository';

@Injectable()
export class ParentService {
  constructor(private readonly parentRepository: ParentRepository) {}

  async create(createParentDto: CreateParentDto): Promise<ParentResponseDto> {
    const parent = await this.parentRepository.create({
      user: {
        connect: {
          id: createParentDto.userId,
        },
      },
      citizenId: createParentDto.citizenId,
    });
    return ParentResponseDto.fromParent(parent);
  }

  async findAll(query: QueryParentDto): Promise<ParentResponseDto[]> {
    const filter = this.buildFilter(query);
    const parents = await this.parentRepository.findByFilter(filter);
    return parents.map(ParentResponseDto.fromParent);
  }

  async findAllWithPagination(
    query: PaginatedQueryParentDto,
  ): Promise<PageableParentResponseDto> {
    const { page, limit, sortBy, sortOrder, ...filterData } = query;
    const filter = this.buildFilter(filterData);
    const pagination = { page, limit, sortBy, sortOrder };

    const result = await this.parentRepository.findByFilterWithPagination(
      filter,
      pagination,
    );

    return {
      ...result,
      data: result.data.map(ParentResponseDto.fromParent),
    };
  }

  async findOne(id: number): Promise<ParentResponseDto> {
    const parent = await this.parentRepository.findById(id);
    if (!parent) {
      throw new NotFoundException(`Parent with ID ${id} not found`);
    }
    return ParentResponseDto.fromParent(parent);
  }

  async update(
    id: number,
    updateParentDto: UpdateParentDto,
  ): Promise<ParentResponseDto> {
    const parent = await this.parentRepository.findById(id);
    if (!parent) {
      throw new NotFoundException(`Parent with ID ${id} not found`);
    }

    const updatedParent = await this.parentRepository.update(id, {
      user: updateParentDto.userId
        ? {
            connect: {
              id: updateParentDto.userId,
            },
          }
        : undefined,
      citizenId: updateParentDto.citizenId,
    });
    return ParentResponseDto.fromParent(updatedParent);
  }

  async remove(id: number): Promise<void> {
    const parent = await this.parentRepository.findById(id);
    if (!parent) {
      throw new NotFoundException(`Parent with ID ${id} not found`);
    }
    await this.parentRepository.delete(id);
  }

  private buildFilter(query: QueryParentDto): Prisma.ParentWhereInput {
    const filter: Prisma.ParentWhereInput = {};

    if (query.userId) {
      filter.userId = query.userId;
    }

    if (query.citizenId) {
      filter.citizenId = { contains: query.citizenId, mode: 'insensitive' };
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
