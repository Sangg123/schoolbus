import { IntersectionType } from '@nestjs/swagger';
import { QueryParentStudentDto } from './query-parent-student.dto';
import { BaseQueryDto } from '../../../core/dto/base-query.dto';

export class PaginatedQueryParentStudentDto extends IntersectionType(
  QueryParentStudentDto,
  BaseQueryDto,
) {}
