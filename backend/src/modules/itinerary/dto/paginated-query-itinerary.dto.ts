import { IntersectionType } from '@nestjs/swagger';
import { QueryItineraryDto } from './query-itinerary.dto';
import { BaseQueryDto } from '../../../core/dto/base-query.dto';

export class PaginatedQueryItineraryDto extends IntersectionType(
  QueryItineraryDto,
  BaseQueryDto,
) {}
