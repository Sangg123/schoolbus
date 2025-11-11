import { PartialType } from '@nestjs/swagger';
import { CreateTripDto } from './create-trip.dto';
import { IsDateString, IsOptional, IsEnum, IsObject } from 'class-validator';
import { TripStatusEnum } from 'src/core/enums/trip-status.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTripDto extends PartialType(CreateTripDto) {
  @ApiPropertyOptional({ enum: TripStatusEnum })
  @IsOptional()
  @IsEnum(TripStatusEnum)
  currentStatus?: TripStatusEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  actualStartTime?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  actualEndTime?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  finalSnapshot?: any;
}
