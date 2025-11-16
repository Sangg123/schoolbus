import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class QueryScheduleDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  routeId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  busId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  driverId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  dayOfWeek?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  routeName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  driverName?: string;
}
