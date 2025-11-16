import { IntersectionType } from '@nestjs/swagger';
import { BaseQueryDto } from '../../../core/dto/base-query.dto';
import { QueryStudentScheduleDto } from './query-student-schedule.dto';

export class PaginatedQueryStudentScheduleDto extends IntersectionType(
  QueryStudentScheduleDto,
  BaseQueryDto,
) {}
