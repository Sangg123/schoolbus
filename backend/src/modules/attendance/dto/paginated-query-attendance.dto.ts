import { IntersectionType } from '@nestjs/swagger';
import { QueryAttendanceDto } from './query-attendance.dto';
import { BaseQueryDto } from '../../../core/dto/base-query.dto';

export class PaginatedQueryAttendanceDto extends IntersectionType(
  QueryAttendanceDto,
  BaseQueryDto,
) {}
