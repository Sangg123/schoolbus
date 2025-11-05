import { IntersectionType } from '@nestjs/swagger';
import { BaseQueryDto } from '../../../core/dto/base-query.dto';
import { QueryStudentDto } from './query-student.dto';

export class PaginatedQueryStudentDto extends IntersectionType(
  QueryStudentDto,
  BaseQueryDto,
) {}
