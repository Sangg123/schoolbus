import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateParentStudentDto {
  @ApiProperty()
  @IsInt()
  parentId: number;

  @ApiProperty()
  @IsInt()
  studentId: number;
}
