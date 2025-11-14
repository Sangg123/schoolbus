import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsObject, IsOptional } from 'class-validator';
import { TripStatusEnum } from 'src/core/enums/trip-status.enum';
import { CreateTripDto } from './create-trip.dto';

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
