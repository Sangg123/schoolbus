import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { RouteRepository } from './route.repository';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { RouteResponseDto } from './dto/route-response.dto';
import { QueryRouteDto } from './dto/query-route.dto';
import { PaginatedQueryRouteDto } from './dto/paginated-query-route.dto';
import { Prisma } from '@prisma/client';
import { PageableRouteResponseDto } from './dto/pageable-route-response.dto';

@Injectable()
export class RouteService {
  constructor(private readonly routeRepository: RouteRepository) {}

  async create(createRouteDto: CreateRouteDto): Promise<RouteResponseDto> {
    const route = await this.routeRepository.create({
      name: createRouteDto.name,
      description: createRouteDto.description,
    });
    return RouteResponseDto.fromRoute(route);
  }

  async findAll(query: QueryRouteDto): Promise<RouteResponseDto[]> {
    const filter = this.buildFilter(query);
    const routes = await this.routeRepository.findByFilter(filter);
    return routes.map(RouteResponseDto.fromRoute);
  }

  async findAllWithPagination(
    query: PaginatedQueryRouteDto,
  ): Promise<PageableRouteResponseDto> {
    const { page, limit, sortBy, sortOrder, ...filterData } = query;
    const filter = this.buildFilter(filterData);
    const pagination = { page, limit, sortBy, sortOrder };

    const result = await this.routeRepository.findByFilterWithPagination(
      filter,
      pagination,
    );

    return {
      ...result,
      data: result.data.map(RouteResponseDto.fromRoute),
    };
  }

  async findOne(id: number): Promise<RouteResponseDto> {
    const route = await this.routeRepository.findById(id);
    if (!route) {
      throw new NotFoundException(`Route with ID ${id} not found`);
    }
    return RouteResponseDto.fromRoute(route);
  }

  async update(id: number, updateRouteDto: UpdateRouteDto): Promise<RouteResponseDto> {
    const route = await this.routeRepository.findById(id);
    if (!route) {
      throw new NotFoundException(`Route with ID ${id} not found`);
    }

    const updatedRoute = await this.routeRepository.update(id, {
      name: updateRouteDto.name,
      description: updateRouteDto.description,
    });
    return RouteResponseDto.fromRoute(updatedRoute);
  }

  async remove(id: number): Promise<void> {
    const route = await this.routeRepository.findById(id);
    if (!route) {
      throw new NotFoundException(`Route with ID ${id} not found`);
    }
    await this.routeRepository.delete(id);
  }

  private buildFilter(query: QueryRouteDto): Prisma.RouteWhereInput {
    const filter: Prisma.RouteWhereInput = {};

    if (query.name) {
      filter.name = { contains: query.name, mode: 'insensitive' };
    }

    if (query.description) {
      filter.description = { contains: query.description, mode: 'insensitive' };
    }

    return filter;
  }
}
