import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsDateString, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { LocationSourceEnum } from 'src/core/enums/location-source.enum';
import { Type } from 'class-transformer';

export class CreateLocationEventDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  tripId?: number;

  @ApiProperty()
  @IsInt()
  busId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  timestamp?: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  latitude: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  longitude: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  speedKph?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  heading?: number;

  @ApiPropertyOptional({ enum: LocationSourceEnum })
  @IsOptional()
  @IsEnum(LocationSourceEnum)
  source?: LocationSourceEnum;
}
