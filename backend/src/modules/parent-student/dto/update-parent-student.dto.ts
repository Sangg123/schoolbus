import { PartialType } from '@nestjs/swagger';
import { CreateParentStudentDto } from './create-parent-student.dto';

export class UpdateParentStudentDto extends PartialType(
  CreateParentStudentDto,
) {}
