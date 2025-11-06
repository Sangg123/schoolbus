import { IntersectionType } from '@nestjs/swagger';
import { QueryRouteDto } from './query-route.dto';
import { BaseQueryDto } from '../../../core/dto/base-query.dto';

export class PaginatedQueryRouteDto extends IntersectionType(
  QueryRouteDto,
  BaseQueryDto,
) {}
