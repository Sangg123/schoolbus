import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ScheduleRepository } from './schedule.repository';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ScheduleResponseDto } from './dto/schedule-response.dto';
import { QueryScheduleDto } from './dto/query-schedule.dto';
import { PaginatedQueryScheduleDto } from './dto/paginated-query-schedule.dto';
import { Prisma } from '@prisma/client';
import { PageableScheduleResponseDto } from './dto/pageable-schedule-response.dto';

@Injectable()
export class ScheduleService {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<ScheduleResponseDto> {
    const schedule = await this.scheduleRepository.create({
      route: {
        connect: {
          id: createScheduleDto.routeId,
        },
      },
      bus: {
        connect: {
          id: createScheduleDto.busId,
        },
      },
      driver: {
        connect: {
          id: createScheduleDto.driverId,
        },
      },
      dayOfWeek: createScheduleDto.dayOfWeek,
      startTime: createScheduleDto.startTime,
      endTime: createScheduleDto.endTime,
    });
    return ScheduleResponseDto.fromSchedule(schedule);
  }

  async findAll(query: QueryScheduleDto): Promise<ScheduleResponseDto[]> {
    const filter = this.buildFilter(query);
    const schedules = await this.scheduleRepository.findByFilter(filter);
    return schedules.map(ScheduleResponseDto.fromSchedule);
  }

  async findAllWithPagination(
    query: PaginatedQueryScheduleDto,
  ): Promise<PageableScheduleResponseDto> {
    const { page, limit, sortBy, sortOrder, ...filterData } = query;
    const filter = this.buildFilter(filterData);
    const pagination = { page, limit, sortBy, sortOrder };

    const result = await this.scheduleRepository.findByFilterWithPagination(
      filter,
      pagination,
    );

    return {
      ...result,
      data: result.data.map(ScheduleResponseDto.fromSchedule),
    };
  }

  async findOne(id: number): Promise<ScheduleResponseDto> {
    const schedule = await this.scheduleRepository.findById(id);
    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }
    return ScheduleResponseDto.fromSchedule(schedule);
  }

  async update(
    id: number,
    updateScheduleDto: UpdateScheduleDto,
  ): Promise<ScheduleResponseDto> {
    const schedule = await this.scheduleRepository.findById(id);
    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }

    const updatedSchedule = await this.scheduleRepository.update(id, {
      route: updateScheduleDto.routeId ? {
        connect: {
          id: updateScheduleDto.routeId,
        },
      } : undefined,
      bus: updateScheduleDto.busId ? {
        connect: {
          id: updateScheduleDto.busId,
        },
      } : undefined,
      driver: updateScheduleDto.driverId ? {
        connect: {
          id: updateScheduleDto.driverId,
        },
      } : undefined,
      dayOfWeek: updateScheduleDto.dayOfWeek,
      startTime: updateScheduleDto.startTime,
      endTime: updateScheduleDto.endTime,
    });
    return ScheduleResponseDto.fromSchedule(updatedSchedule);
  }

  async remove(id: number): Promise<void> {
    const schedule = await this.scheduleRepository.findById(id);
    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }
    await this.scheduleRepository.delete(id);
  }

  private buildFilter(query: QueryScheduleDto): Prisma.ScheduleWhereInput {
    const filter: Prisma.ScheduleWhereInput = {};

    if (query.routeId) {
      filter.routeId = query.routeId;
    }

    if (query.busId) {
      filter.busId = query.busId;
    }

    if (query.driverId) {
      filter.driverId = query.driverId;
    }

    if (query.dayOfWeek) {
      filter.dayOfWeek = query.dayOfWeek;
    }

    if (query.routeName) {
      filter.route = {
        name: { contains: query.routeName, mode: 'insensitive' },
      };
    }

    if (query.driverName) {
      filter.driver = {
        user: {
          fullName: { contains: query.driverName, mode: 'insensitive' },
        },
      };
    }

    return filter;
  }
}
