import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ItineraryRepository } from './itinerary.repository';
import { CreateItineraryDto } from './dto/create-itinerary.dto';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';
import { ItineraryResponseDto } from './dto/itinerary-response.dto';
import { QueryItineraryDto } from './dto/query-itinerary.dto';
import { PaginatedQueryItineraryDto } from './dto/paginated-query-itinerary.dto';
import { Prisma } from '@prisma/client';
import { PageableItineraryResponseDto } from './dto/pageable-itinerary-response.dto';

@Injectable()
export class ItineraryService {
  constructor(private readonly itineraryRepository: ItineraryRepository) {}

  async create(createItineraryDto: CreateItineraryDto): Promise<ItineraryResponseDto> {
    const itinerary = await this.itineraryRepository.create({
      route: {
        connect: {
          id: createItineraryDto.routeId,
        },
      },
      stop: {
        connect: {
          id: createItineraryDto.stopId,
        },
      },
      stopOrder: createItineraryDto.stopOrder,
      estimatedTime: createItineraryDto.estimatedTime,
    });
    return ItineraryResponseDto.fromItinerary(itinerary);
  }

  async findAll(query: QueryItineraryDto): Promise<ItineraryResponseDto[]> {
    const filter = this.buildFilter(query);
    const itineraries = await this.itineraryRepository.findByFilter(filter);
    return itineraries.map(ItineraryResponseDto.fromItinerary);
  }

  async findAllWithPagination(
    query: PaginatedQueryItineraryDto,
  ): Promise<PageableItineraryResponseDto> {
    const { page, limit, sortBy, sortOrder, ...filterData } = query;
    const filter = this.buildFilter(filterData);
    const pagination = { page, limit, sortBy, sortOrder };

    const result = await this.itineraryRepository.findByFilterWithPagination(
      filter,
      pagination,
    );

    return {
      ...result,
      data: result.data.map(ItineraryResponseDto.fromItinerary),
    };
  }

  async findOne(id: number): Promise<ItineraryResponseDto> {
    const itinerary = await this.itineraryRepository.findById(id);
    if (!itinerary) {
      throw new NotFoundException(`Itinerary with ID ${id} not found`);
    }
    return ItineraryResponseDto.fromItinerary(itinerary);
  }

  async update(
    id: number,
    updateItineraryDto: UpdateItineraryDto,
  ): Promise<ItineraryResponseDto> {
    const itinerary = await this.itineraryRepository.findById(id);
    if (!itinerary) {
      throw new NotFoundException(`Itinerary with ID ${id} not found`);
    }

    const updatedItinerary = await this.itineraryRepository.update(id, {
      route: updateItineraryDto.routeId ? {
        connect: {
          id: updateItineraryDto.routeId,
        },
      } : undefined,
      stop: updateItineraryDto.stopId ? {
        connect: {
          id: updateItineraryDto.stopId,
        },
      } : undefined,
      stopOrder: updateItineraryDto.stopOrder,
      estimatedTime: updateItineraryDto.estimatedTime,
    });
    return ItineraryResponseDto.fromItinerary(updatedItinerary);
  }

  async remove(id: number): Promise<void> {
    const itinerary = await this.itineraryRepository.findById(id);
    if (!itinerary) {
      throw new NotFoundException(`Itinerary with ID ${id} not found`);
    }
    await this.itineraryRepository.delete(id);
  }

  private buildFilter(query: QueryItineraryDto): Prisma.ItineraryWhereInput {
    const filter: Prisma.ItineraryWhereInput = {};

    if (query.routeId) {
      filter.routeId = query.routeId;
    }

    if (query.stopId) {
      filter.stopId = query.stopId;
    }

    if (query.stopOrder) {
      filter.stopOrder = query.stopOrder;
    }

    if (query.routeName) {
      filter.route = {
        name: { contains: query.routeName, mode: 'insensitive' },
      };
    }

    if (query.stopName) {
      filter.stop = {
        name: { contains: query.stopName, mode: 'insensitive' },
      };
    }

    return filter;
  }
}
