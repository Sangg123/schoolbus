import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateParentStudentDto {
  @ApiProperty()
  @IsInt()
  parentId: number;

  @ApiProperty()
  @IsInt()
  studentId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  relationship?: string;
}
