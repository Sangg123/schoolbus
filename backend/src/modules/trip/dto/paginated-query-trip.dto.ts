import { IntersectionType } from '@nestjs/swagger';
import { BaseQueryDto } from '../../../core/dto/base-query.dto';
import { QueryTripDto } from './query-trip.dto';

export class PaginatedQueryTripDto extends IntersectionType(
  QueryTripDto,
  BaseQueryDto,
) {}
