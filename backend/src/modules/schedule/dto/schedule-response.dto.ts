import { ApiProperty } from '@nestjs/swagger';
import { Schedule } from '@prisma/client';

export class ScheduleResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  routeId: number;

  @ApiProperty()
  busId: number;

  @ApiProperty()
  driverId: number;

  @ApiProperty()
  dayOfWeek: number;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endTime: Date;

  static fromSchedule(schedule: Schedule): ScheduleResponseDto {
    const dto = new ScheduleResponseDto();
    dto.id = schedule.id;
    dto.routeId = schedule.routeId;
    dto.busId = schedule.busId;
    dto.driverId = schedule.driverId;
    dto.dayOfWeek = schedule.dayOfWeek;
    dto.startTime = schedule.startTime;
    dto.endTime = schedule.endTime;
    return dto;
  }
}
