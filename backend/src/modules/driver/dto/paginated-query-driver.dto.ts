import { IntersectionType } from '@nestjs/swagger';
import { QueryDriverDto } from './query-driver.dto';
import { BaseQueryDto } from '../../../core/dto/base-query.dto';

export class PaginatedQueryDriverDto extends IntersectionType(
  QueryDriverDto,
  BaseQueryDto,
) {}
