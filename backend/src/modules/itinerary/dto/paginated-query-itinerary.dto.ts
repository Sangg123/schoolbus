import { IntersectionType } from '@nestjs/swagger';
import { BaseQueryDto } from '../../../core/dto/base-query.dto';
import { QueryItineraryDto } from './query-itinerary.dto';

export class PaginatedQueryItineraryDto extends IntersectionType(
  QueryItineraryDto,
  BaseQueryDto,
) {}
