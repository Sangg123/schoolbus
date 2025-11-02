import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt } from 'class-validator';

export class QueryAdminDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  userId?: number;
}
