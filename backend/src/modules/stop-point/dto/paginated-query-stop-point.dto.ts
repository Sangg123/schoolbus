import { IntersectionType } from '@nestjs/swagger';
import { QueryStopPointDto } from './query-stop-point.dto';
import { BaseQueryDto } from '../../../core/dto/base-query.dto';

export class PaginatedQueryStopPointDto extends IntersectionType(
  QueryStopPointDto,
  BaseQueryDto,
) {}
