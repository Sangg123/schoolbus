import { IntersectionType } from '@nestjs/swagger';
import { BaseQueryDto } from '../../../core/dto/base-query.dto';
import { QueryBusDto } from './query-bus.dto';

export class PaginatedQueryBusDto extends IntersectionType(
  QueryBusDto,
  BaseQueryDto,
) {}
