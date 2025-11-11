import { IntersectionType } from '@nestjs/swagger';
import { QueryTripDto } from './query-trip.dto';
import { BaseQueryDto } from '../../../core/dto/base-query.dto';

export class PaginatedQueryTripDto extends IntersectionType(
  QueryTripDto,
  BaseQueryDto,
) {}
