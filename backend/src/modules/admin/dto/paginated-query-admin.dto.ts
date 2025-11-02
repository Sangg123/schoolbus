import { IntersectionType } from '@nestjs/swagger';
import { QueryAdminDto } from './query-admin.dto';
import { BaseQueryDto } from '../../../core/dto/base-query.dto';

export class PaginatedQueryAdminDto extends IntersectionType(
  QueryAdminDto,
  BaseQueryDto,
) {}
