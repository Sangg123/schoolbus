import { ApiProperty } from '@nestjs/swagger';
import { ParentStudent } from '@prisma/client';

export class ParentStudentResponseDto {
  @ApiProperty()
  parentId: number;

  @ApiProperty()
  studentId: number;

  static fromParentStudent(parentStudent: ParentStudent): ParentStudentResponseDto {
    const dto = new ParentStudentResponseDto();
    dto.parentId = parentStudent.parentId;
    dto.studentId = parentStudent.studentId;
    return dto;
  }
}
