import { IntersectionType } from '@nestjs/swagger';
import { BaseQueryDto } from '../../../core/dto/base-query.dto';
import { QueryAdminDto } from './query-admin.dto';

export class PaginatedQueryAdminDto extends IntersectionType(
  QueryAdminDto,
  BaseQueryDto,
) {}
