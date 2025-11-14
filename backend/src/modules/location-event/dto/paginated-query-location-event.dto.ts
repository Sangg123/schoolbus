import { IntersectionType } from '@nestjs/swagger';
import { BaseQueryDto } from '../../../core/dto/base-query.dto';
import { QueryLocationEventDto } from './query-location-event.dto';

export class PaginatedQueryLocationEventDto extends IntersectionType(
  QueryLocationEventDto,
  BaseQueryDto,
) {}
