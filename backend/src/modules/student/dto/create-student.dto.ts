import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  class?: string;

  @ApiProperty()
  @IsString()
  studentCode: string;
}
