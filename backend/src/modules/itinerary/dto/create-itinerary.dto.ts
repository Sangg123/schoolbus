import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional } from 'class-validator';

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
