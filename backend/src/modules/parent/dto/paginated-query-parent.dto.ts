import { IntersectionType } from '@nestjs/swagger';
import { BaseQueryDto } from '../../../core/dto/base-query.dto';
import { QueryParentDto } from './query-parent.dto';

export class PaginatedQueryParentDto extends IntersectionType(
  QueryParentDto,
  BaseQueryDto,
) {}
