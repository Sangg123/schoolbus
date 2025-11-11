import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsDateString, IsOptional, IsEnum, IsObject } from 'class-validator';
import { TripStatusEnum } from 'src/core/enums/trip-status.enum';

export class CreateTripDto {
  @ApiProperty()
  @IsInt()
  scheduleId: number;

  @ApiProperty()
  @IsDateString()
  tripDate: string;

  @ApiPropertyOptional({ enum: TripStatusEnum })
  @IsOptional()
  @IsEnum(TripStatusEnum)
  currentStatus?: TripStatusEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  initialSnapshot?: any;
}
