import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, IsEnum, IsDateString, IsNumber } from 'class-validator';
import { LocationSourceEnum } from 'src/core/enums/location-source.enum';
import { Type } from 'class-transformer';

export class QueryLocationEventDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  tripId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  busId?: number;

  @ApiPropertyOptional({ enum: LocationSourceEnum })
  @IsOptional()
  @IsEnum(LocationSourceEnum)
  source?: LocationSourceEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  timestampFrom?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  timestampTo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  speedMin?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  speedMax?: number;
}
