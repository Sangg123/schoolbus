import { IntersectionType } from '@nestjs/swagger';
import { BaseQueryDto } from '../../../core/dto/base-query.dto';
import { QueryScheduleDto } from './query-schedule.dto';

export class PaginatedQueryScheduleDto extends IntersectionType(
  QueryScheduleDto,
  BaseQueryDto,
) {}
