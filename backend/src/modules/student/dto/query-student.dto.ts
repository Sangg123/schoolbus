import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class QueryStudentDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  class?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  studentCode?: string;
}
