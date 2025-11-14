import { ApiProperty } from '@nestjs/swagger';
import { Attendance, AttendanceAction } from '@prisma/client';

export class AttendanceResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  tripId: number;

  @ApiProperty()
  studentId: number;

  @ApiProperty()
  stopId: number;

  @ApiProperty({ enum: AttendanceAction })
  action: AttendanceAction;

  @ApiProperty()
  timestamp: Date;

  static fromAttendance(attendance: Attendance): AttendanceResponseDto {
    const dto = new AttendanceResponseDto();
    dto.id = attendance.id;
    dto.tripId = attendance.tripId;
    dto.studentId = attendance.studentId;
    dto.stopId = attendance.stopId;
    dto.action = attendance.action;
    dto.timestamp = attendance.timestamp;
    return dto;
  }
}
