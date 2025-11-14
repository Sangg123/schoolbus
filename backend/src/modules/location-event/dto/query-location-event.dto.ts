import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { LocationSourceEnum } from 'src/core/enums/location-source.enum';

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
