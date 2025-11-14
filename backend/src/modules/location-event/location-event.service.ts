import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateLocationEventDto } from './dto/create-location-event.dto';
import { LocationEventResponseDto } from './dto/location-event-response.dto';
import { PageableLocationEventResponseDto } from './dto/pageable-location-event-response.dto';
import { PaginatedQueryLocationEventDto } from './dto/paginated-query-location-event.dto';
import { QueryLocationEventDto } from './dto/query-location-event.dto';
import { UpdateLocationEventDto } from './dto/update-location-event.dto';
import { LocationEventRepository } from './location-event.repository';

@Injectable()
export class LocationEventService {
  constructor(
    private readonly locationEventRepository: LocationEventRepository,
  ) {}

  async create(
    createLocationEventDto: CreateLocationEventDto,
  ): Promise<LocationEventResponseDto> {
    const locationEvent = await this.locationEventRepository.create({
      trip: createLocationEventDto.tripId
        ? {
            connect: {
              id: createLocationEventDto.tripId,
            },
          }
        : undefined,
      bus: {
        connect: {
          id: createLocationEventDto.busId,
        },
      },
      timestamp: createLocationEventDto.timestamp,
      latitude: createLocationEventDto.latitude,
      longitude: createLocationEventDto.longitude,
      speedKph: createLocationEventDto.speedKph,
      heading: createLocationEventDto.heading,
      source: createLocationEventDto.source,
    });
    return LocationEventResponseDto.fromLocationEvent(locationEvent);
  }

  async findAll(
    query: QueryLocationEventDto,
  ): Promise<LocationEventResponseDto[]> {
    const filter = this.buildFilter(query);
    const locationEvents =
      await this.locationEventRepository.findByFilter(filter);
    return locationEvents.map(LocationEventResponseDto.fromLocationEvent);
  }

  async findAllWithPagination(
    query: PaginatedQueryLocationEventDto,
  ): Promise<PageableLocationEventResponseDto> {
    const { page, limit, sortBy, sortOrder, ...filterData } = query;
    const filter = this.buildFilter(filterData);
    const pagination = { page, limit, sortBy, sortOrder };

    const result =
      await this.locationEventRepository.findByFilterWithPagination(
        filter,
        pagination,
      );

    return {
      ...result,
      data: result.data.map(LocationEventResponseDto.fromLocationEvent),
    };
  }

  async findOne(id: number): Promise<LocationEventResponseDto> {
    const locationEvent = await this.locationEventRepository.findById(id);
    if (!locationEvent) {
      throw new NotFoundException(`LocationEvent with ID ${id} not found`);
    }
    return LocationEventResponseDto.fromLocationEvent(locationEvent);
  }

  async update(
    id: number,
    updateLocationEventDto: UpdateLocationEventDto,
  ): Promise<LocationEventResponseDto> {
    const locationEvent = await this.locationEventRepository.findById(id);
    if (!locationEvent) {
      throw new NotFoundException(`LocationEvent with ID ${id} not found`);
    }

    const updatedLocationEvent = await this.locationEventRepository.update(id, {
      trip: updateLocationEventDto.tripId
        ? {
            connect: {
              id: updateLocationEventDto.tripId,
            },
          }
        : updateLocationEventDto.tripId === null
          ? { disconnect: true }
          : undefined,
      bus: updateLocationEventDto.busId
        ? {
            connect: {
              id: updateLocationEventDto.busId,
            },
          }
        : undefined,
      timestamp: updateLocationEventDto.timestamp,
      latitude: updateLocationEventDto.latitude,
      longitude: updateLocationEventDto.longitude,
      speedKph: updateLocationEventDto.speedKph,
      heading: updateLocationEventDto.heading,
      source: updateLocationEventDto.source,
    });
    return LocationEventResponseDto.fromLocationEvent(updatedLocationEvent);
  }

  async remove(id: number): Promise<void> {
    const locationEvent = await this.locationEventRepository.findById(id);
    if (!locationEvent) {
      throw new NotFoundException(`LocationEvent with ID ${id} not found`);
    }
    await this.locationEventRepository.delete(id);
  }

  private buildFilter(
    query: QueryLocationEventDto,
  ): Prisma.LocationEventWhereInput {
    const filter: Prisma.LocationEventWhereInput = {};

    if (query.tripId) {
      filter.tripId = query.tripId;
    }

    if (query.busId) {
      filter.busId = query.busId;
    }

    if (query.source) {
      filter.source = query.source;
    }

    if (query.timestampFrom || query.timestampTo) {
      filter.timestamp = {};
      if (query.timestampFrom)
        filter.timestamp.gte = new Date(query.timestampFrom);
      if (query.timestampTo) filter.timestamp.lte = new Date(query.timestampTo);
    }

    if (query.speedMin || query.speedMax) {
      filter.speedKph = {};
      if (query.speedMin) filter.speedKph.gte = query.speedMin;
      if (query.speedMax) filter.speedKph.lte = query.speedMax;
    }

    return filter;
  }
}
