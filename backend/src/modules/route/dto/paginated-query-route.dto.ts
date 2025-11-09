import { IntersectionType } from '@nestjs/swagger';
import { BaseQueryDto } from '../../../core/dto/base-query.dto';
import { QueryRouteDto } from './query-route.dto';

export class PaginatedQueryRouteDto extends IntersectionType(
  QueryRouteDto,
  BaseQueryDto,
) {}
