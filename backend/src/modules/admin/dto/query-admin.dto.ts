import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class QueryAdminDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  userId?: number;
}
