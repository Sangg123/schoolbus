import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateTripDto } from './dto/create-trip.dto';
import { PageableTripResponseDto } from './dto/pageable-trip-response.dto';
import { PaginatedQueryTripDto } from './dto/paginated-query-trip.dto';
import { QueryTripDto } from './dto/query-trip.dto';
import { TripResponseDto } from './dto/trip-response.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { TripRepository } from './trip.repository';

@Injectable()
export class TripService {
  constructor(private readonly tripRepository: TripRepository) {}

  async create(createTripDto: CreateTripDto): Promise<TripResponseDto> {
    const trip = await this.tripRepository.create({
      schedule: {
        connect: {
          id: createTripDto.scheduleId,
        },
      },
      tripDate: createTripDto.tripDate,
      initialSnapshot: createTripDto.initialSnapshot,
    });
    return TripResponseDto.fromTrip(trip);
  }

  async findAll(query: QueryTripDto): Promise<TripResponseDto[]> {
    const filter = this.buildFilter(query);
    const trips = await this.tripRepository.findByFilter(filter);
    return trips.map(TripResponseDto.fromTrip);
  }

  async findAllWithPagination(
    query: PaginatedQueryTripDto,
  ): Promise<PageableTripResponseDto> {
    const { page, limit, sortBy, sortOrder, ...filterData } = query;
    const filter = this.buildFilter(filterData);
    const pagination = { page, limit, sortBy, sortOrder };

    const result = await this.tripRepository.findByFilterWithPagination(
      filter,
      pagination,
    );

    return {
      ...result,
      data: result.data.map(TripResponseDto.fromTrip),
    };
  }

  async findOne(id: number): Promise<TripResponseDto> {
    const trip = await this.tripRepository.findById(id);
    if (!trip) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }
    return TripResponseDto.fromTrip(trip);
  }

  async update(
    id: number,
    updateTripDto: UpdateTripDto,
  ): Promise<TripResponseDto> {
    const trip = await this.tripRepository.findById(id);
    if (!trip) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }

    const updatedTrip = await this.tripRepository.update(id, {
      schedule: updateTripDto.scheduleId
        ? {
            connect: {
              id: updateTripDto.scheduleId,
            },
          }
        : undefined,
      tripDate: updateTripDto.tripDate,
      currentStatus: updateTripDto.currentStatus,
      actualStartTime: updateTripDto.actualStartTime,
      actualEndTime: updateTripDto.actualEndTime,
      finalSnapshot: updateTripDto.finalSnapshot,
    });
    return TripResponseDto.fromTrip(updatedTrip);
  }

  async remove(id: number): Promise<void> {
    const trip = await this.tripRepository.findById(id);
    if (!trip) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }
    await this.tripRepository.delete(id);
  }

  private buildFilter(query: QueryTripDto): Prisma.TripWhereInput {
    const filter: Prisma.TripWhereInput = {};

    if (query.scheduleId) {
      filter.scheduleId = query.scheduleId;
    }

    if (query.currentStatus) {
      filter.currentStatus = query.currentStatus;
    }

    if (query.tripDateFrom || query.tripDateTo) {
      filter.tripDate = {};
      if (query.tripDateFrom)
        filter.tripDate.gte = new Date(query.tripDateFrom);
      if (query.tripDateTo) filter.tripDate.lte = new Date(query.tripDateTo);
    }

    if (query.scheduleDayOfWeek) {
      filter.schedule = {
        dayOfWeek: query.scheduleDayOfWeek,
      };
    }

    // Build schedule filter object separately
    const scheduleFilter: Prisma.ScheduleWhereInput = {};

    if (query.scheduleDayOfWeek) {
      scheduleFilter.dayOfWeek = query.scheduleDayOfWeek;
    }

    if (query.driverId) {
      scheduleFilter.driverId = query.driverId;
    }

    if (query.busId) {
      scheduleFilter.busId = query.busId;
    }

    // Only assign if there are any schedule filters
    if (Object.keys(scheduleFilter).length > 0) {
      filter.schedule = scheduleFilter;
    }

    return filter;
  }
}
