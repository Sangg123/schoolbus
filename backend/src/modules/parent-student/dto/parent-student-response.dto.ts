import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ParentStudent } from '@prisma/client';

export class ParentStudentResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  parentId: number;

  @ApiProperty()
  studentId: number;

  @ApiPropertyOptional({ nullable: true })
  relationship: string | null;

  static fromParentStudent(parentStudent: ParentStudent): ParentStudentResponseDto {
    const dto = new ParentStudentResponseDto();
    dto.id = parentStudent.id;
    dto.parentId = parentStudent.parentId;
    dto.studentId = parentStudent.studentId;
    dto.relationship = parentStudent.relationship;
    return dto;
  }
}
