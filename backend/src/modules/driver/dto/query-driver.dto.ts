import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, IsString } from 'class-validator';

export class QueryDriverDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  userId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  citizenId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  licenseId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  user?: string;
}
