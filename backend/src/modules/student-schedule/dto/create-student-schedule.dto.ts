import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class CreateStudentScheduleDto {
  @ApiProperty()
  @IsInt()
  studentId: number;

  @ApiProperty()
  @IsInt()
  scheduleId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  pickupStopId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  dropoffStopId?: number;
}
