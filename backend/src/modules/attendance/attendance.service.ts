import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AttendanceRepository } from './attendance.repository';
import { AttendanceResponseDto } from './dto/attendance-response.dto';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { PageableAttendanceResponseDto } from './dto/pageable-attendance-response.dto';
import { PaginatedQueryAttendanceDto } from './dto/paginated-query-attendance.dto';
import { QueryAttendanceDto } from './dto/query-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(private readonly attendanceRepository: AttendanceRepository) {}

  async create(
    createAttendanceDto: CreateAttendanceDto,
  ): Promise<AttendanceResponseDto> {
    const attendance = await this.attendanceRepository.create({
      trip: {
        connect: {
          id: createAttendanceDto.tripId,
        },
      },
      student: {
        connect: {
          id: createAttendanceDto.studentId,
        },
      },
      stop: {
        connect: {
          id: createAttendanceDto.stopId,
        },
      },
      action: createAttendanceDto.action,
      timestamp: createAttendanceDto.timestamp,
    });
    return AttendanceResponseDto.fromAttendance(attendance);
  }

  async findAll(query: QueryAttendanceDto): Promise<AttendanceResponseDto[]> {
    const filter = this.buildFilter(query);
    const attendances = await this.attendanceRepository.findByFilter(filter);
    return attendances.map(AttendanceResponseDto.fromAttendance);
  }

  async findAllWithPagination(
    query: PaginatedQueryAttendanceDto,
  ): Promise<PageableAttendanceResponseDto> {
    const { page, limit, sortBy, sortOrder, ...filterData } = query;
    const filter = this.buildFilter(filterData);
    const pagination = { page, limit, sortBy, sortOrder };

    const result = await this.attendanceRepository.findByFilterWithPagination(
      filter,
      pagination,
    );

    return {
      ...result,
      data: result.data.map(AttendanceResponseDto.fromAttendance),
    };
  }

  async findOne(id: number): Promise<AttendanceResponseDto> {
    const attendance = await this.attendanceRepository.findById(id);
    if (!attendance) {
      throw new NotFoundException(`Attendance with ID ${id} not found`);
    }
    return AttendanceResponseDto.fromAttendance(attendance);
  }

  async update(
    id: number,
    updateAttendanceDto: UpdateAttendanceDto,
  ): Promise<AttendanceResponseDto> {
    const attendance = await this.attendanceRepository.findById(id);
    if (!attendance) {
      throw new NotFoundException(`Attendance with ID ${id} not found`);
    }

    const updatedAttendance = await this.attendanceRepository.update(id, {
      trip: updateAttendanceDto.tripId
        ? {
            connect: {
              id: updateAttendanceDto.tripId,
            },
          }
        : undefined,
      student: updateAttendanceDto.studentId
        ? {
            connect: {
              id: updateAttendanceDto.studentId,
            },
          }
        : undefined,
      stop: updateAttendanceDto.stopId
        ? {
            connect: {
              id: updateAttendanceDto.stopId,
            },
          }
        : undefined,
      action: updateAttendanceDto.action,
      timestamp: updateAttendanceDto.timestamp,
    });
    return AttendanceResponseDto.fromAttendance(updatedAttendance);
  }

  async remove(id: number): Promise<void> {
    const attendance = await this.attendanceRepository.findById(id);
    if (!attendance) {
      throw new NotFoundException(`Attendance with ID ${id} not found`);
    }
    await this.attendanceRepository.delete(id);
  }

  private buildFilter(query: QueryAttendanceDto): Prisma.AttendanceWhereInput {
    const filter: Prisma.AttendanceWhereInput = {};

    if (query.tripId) {
      filter.tripId = query.tripId;
    }

    if (query.studentId) {
      filter.studentId = query.studentId;
    }

    if (query.stopId) {
      filter.stopId = query.stopId;
    }

    if (query.action) {
      filter.action = query.action;
    }

    if (query.timestampFrom || query.timestampTo) {
      filter.timestamp = {};
      if (query.timestampFrom)
        filter.timestamp.gte = new Date(query.timestampFrom);
      if (query.timestampTo) filter.timestamp.lte = new Date(query.timestampTo);
    }

    if (query.studentName) {
      filter.student = {
        fullName: { contains: query.studentName, mode: 'insensitive' },
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
