import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsOptional } from 'class-validator';
import { TripStatusEnum } from 'src/core/enums/trip-status.enum';

export class QueryTripDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  scheduleId?: number;

  @ApiPropertyOptional({ enum: TripStatusEnum })
  @IsOptional()
  @IsEnum(TripStatusEnum)
  currentStatus?: TripStatusEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  tripDateFrom?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  tripDateTo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  scheduleDayOfWeek?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  driverId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  busId?: number;
}
