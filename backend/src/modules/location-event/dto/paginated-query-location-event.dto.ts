import { IntersectionType } from '@nestjs/swagger';
import { QueryLocationEventDto } from './query-location-event.dto';
import { BaseQueryDto } from '../../../core/dto/base-query.dto';

export class PaginatedQueryLocationEventDto extends IntersectionType(
  QueryLocationEventDto,
  BaseQueryDto,
) {}
