import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { AttendanceActionEnum } from 'src/core/enums/attendance-action.enum';

export class QueryAttendanceDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  tripId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  studentId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  stopId?: number;

  @ApiPropertyOptional({ enum: AttendanceActionEnum })
  @IsOptional()
  @IsEnum(AttendanceActionEnum)
  action?: AttendanceActionEnum;

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
  @IsString()
  studentName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  stopName?: string;
}
