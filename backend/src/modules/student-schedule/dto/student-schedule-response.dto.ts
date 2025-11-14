import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StudentSchedule } from '@prisma/client';

export class StudentScheduleResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  studentId: number;

  @ApiProperty()
  scheduleId: number;

  @ApiPropertyOptional({ nullable: true })
  pickupStopId: number | null;

  @ApiPropertyOptional({ nullable: true })
  dropoffStopId: number | null;

  static fromStudentSchedule(
    studentSchedule: StudentSchedule,
  ): StudentScheduleResponseDto {
    const dto = new StudentScheduleResponseDto();
    dto.id = studentSchedule.id;
    dto.studentId = studentSchedule.studentId;
    dto.scheduleId = studentSchedule.scheduleId;
    dto.pickupStopId = studentSchedule.pickupStopId;
    dto.dropoffStopId = studentSchedule.dropoffStopId;
    return dto;
  }
}
