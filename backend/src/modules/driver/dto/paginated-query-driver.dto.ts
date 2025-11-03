import { IntersectionType } from '@nestjs/swagger';
import { BaseQueryDto } from '../../../core/dto/base-query.dto';
import { QueryDriverDto } from './query-driver.dto';

export class PaginatedQueryDriverDto extends IntersectionType(
  QueryDriverDto,
  BaseQueryDto,
) {}
