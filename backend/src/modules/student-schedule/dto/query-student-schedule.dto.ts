import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, IsString, IsEnum } from 'class-validator';
import { TripType } from '@prisma/client';

export class QueryStudentScheduleDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  studentId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  scheduleId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  pickupStopId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  dropoffStopId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  studentName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  scheduleDayOfWeek?: number;

  // @ApiPropertyOptional({ enum: TripType })
  // @IsOptional()
  // @IsEnum(TripType)
  // scheduleTripType?: TripType;
}
