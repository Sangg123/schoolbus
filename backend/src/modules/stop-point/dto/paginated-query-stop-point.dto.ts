import { IntersectionType } from '@nestjs/swagger';
import { BaseQueryDto } from '../../../core/dto/base-query.dto';
import { QueryStopPointDto } from './query-stop-point.dto';

export class PaginatedQueryStopPointDto extends IntersectionType(
  QueryStopPointDto,
  BaseQueryDto,
) {}
