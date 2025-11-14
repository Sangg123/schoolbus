import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsOptional } from 'class-validator';
import { AttendanceActionEnum } from 'src/core/enums/attendance-action.enum';

export class CreateAttendanceDto {
  @ApiProperty()
  @IsInt()
  tripId: number;

  @ApiProperty()
  @IsInt()
  studentId: number;

  @ApiProperty()
  @IsInt()
  stopId: number;

  @ApiProperty({ enum: AttendanceActionEnum })
  @IsEnum(AttendanceActionEnum)
  action: AttendanceActionEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  timestamp?: string;
}
