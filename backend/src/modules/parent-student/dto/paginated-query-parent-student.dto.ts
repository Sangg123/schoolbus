import { IntersectionType } from '@nestjs/swagger';
import { BaseQueryDto } from '../../../core/dto/base-query.dto';
import { QueryParentStudentDto } from './query-parent-student.dto';

export class PaginatedQueryParentStudentDto extends IntersectionType(
  QueryParentStudentDto,
  BaseQueryDto,
) {}
