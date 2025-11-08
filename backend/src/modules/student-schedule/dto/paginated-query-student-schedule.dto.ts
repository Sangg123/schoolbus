import { IntersectionType } from '@nestjs/swagger';
import { QueryStudentScheduleDto } from './query-student-schedule.dto';
import { BaseQueryDto } from '../../../core/dto/base-query.dto';

export class PaginatedQueryStudentScheduleDto extends IntersectionType(
  QueryStudentScheduleDto,
  BaseQueryDto,
) {}
