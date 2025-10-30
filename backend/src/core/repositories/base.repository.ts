import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationParams, Pageable } from '../interfaces';

@Injectable()
export abstract class BaseRepository<T, C, U, F> {
  protected abstract readonly prisma: PrismaService;
  protected abstract readonly model: string;

  async findAll(): Promise<T[]> {
    return (this.prisma as any)[this.model].findMany() as T[];
  }

  async findAllWithPagination(
    pagination: PaginationParams,
  ): Promise<Pageable<T>> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'id',
      sortOrder = 'asc',
    } = pagination;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      (this.prisma as any)[this.model].findMany({
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }) as T[],
      (this.prisma as any)[this.model].count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
    };
  }

  async findByFilter(filter: F): Promise<T[]> {
    return (this.prisma as any)[this.model].findMany({
      where: filter,
    }) as T[];
  }

  async findByFilterWithPagination(
    filter: F,
    pagination: PaginationParams,
  ): Promise<Pageable<T>> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'id',
      sortOrder = 'asc',
    } = pagination;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      (this.prisma as any)[this.model].findMany({
        where: filter,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }) as T[],
      (this.prisma as any)[this.model].count({ where: filter }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
    };
  }

  async findById(id: number): Promise<T | null> {
    return (this.prisma as any)[this.model].findUnique({
      where: { id },
    }) as T | null;
  }

  async create(data: C): Promise<T> {
    return (this.prisma as any)[this.model].create({
      data,
    }) as T;
  }

  async update(id: number, data: U): Promise<T> {
    return (this.prisma as any)[this.model].update({
      where: { id },
      data,
    }) as T;
  }

  async delete(id: number): Promise<T> {
    return (this.prisma as any)[this.model].delete({
      where: { id },
    }) as T;
  }

  async exists(id: number): Promise<boolean> {
    const item = await (this.prisma as any)[this.model].findUnique({
      where: { id },
      select: { id: true },
    });
    return !!item;
  }
}
