import { IntersectionType } from '@nestjs/swagger';
import { BaseQueryDto } from 'src/core/dto/base-query.dto';
import { QueryUserDto } from './query-user.dto';

export class PaginatedQueryUserDto extends IntersectionType(
  QueryUserDto,
  BaseQueryDto,
) {}
