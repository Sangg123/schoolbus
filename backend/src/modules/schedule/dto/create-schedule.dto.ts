import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDateString } from 'class-validator';

export class CreateScheduleDto {
  @ApiProperty()
  @IsInt()
  routeId: number;

  @ApiProperty()
  @IsInt()
  busId: number;

  @ApiProperty()
  @IsInt()
  driverId: number;

  @ApiProperty()
  @IsInt()
  dayOfWeek: number;

  @ApiProperty()
  @IsDateString()
  startTime: string;

  @ApiProperty()
  @IsDateString()
  endTime: string;
}
