import { IntersectionType } from '@nestjs/swagger';
import { QueryScheduleDto } from './query-schedule.dto';
import { BaseQueryDto } from '../../../core/dto/base-query.dto';

export class PaginatedQueryScheduleDto extends IntersectionType(
  QueryScheduleDto,
  BaseQueryDto,
) {}
