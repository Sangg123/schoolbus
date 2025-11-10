import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsDateString } from 'class-validator';

export class CreateItineraryDto {
  @ApiProperty()
  @IsInt()
  routeId: number;

  @ApiProperty()
  @IsInt()
  stopId: number;

  @ApiProperty()
  @IsInt()
  stopOrder: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  estimatedTime?: string;
}
