import { IntersectionType } from '@nestjs/swagger';
import { QueryBusDto } from './query-bus.dto';
import { BaseQueryDto } from '../../../core/dto/base-query.dto';

export class PaginatedQueryBusDto extends IntersectionType(
  QueryBusDto,
  BaseQueryDto,
) {}
