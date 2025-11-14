import { IntersectionType } from '@nestjs/swagger';
import { BaseQueryDto } from '../../../core/dto/base-query.dto';
import { QueryAttendanceDto } from './query-attendance.dto';

export class PaginatedQueryAttendanceDto extends IntersectionType(
  QueryAttendanceDto,
  BaseQueryDto,
) {}
