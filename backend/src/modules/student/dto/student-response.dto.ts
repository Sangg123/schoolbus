import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Student } from '@prisma/client';

export class StudentResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fullName: string;

  @ApiPropertyOptional({ nullable: true })
  class: string | null;

  @ApiProperty()
  studentCode: string;

  static fromStudent(student: Student): StudentResponseDto {
    const dto = new StudentResponseDto();
    dto.id = student.id;
    dto.fullName = student.fullName;
    dto.class = student.class;
    dto.studentCode = student.studentCode;
    return dto;
  }
}
