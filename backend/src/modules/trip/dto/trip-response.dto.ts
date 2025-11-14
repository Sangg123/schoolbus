import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Trip, TripStatus } from '@prisma/client';

export class TripResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  scheduleId: number;

  @ApiProperty()
  tripDate: Date;

  @ApiProperty({ enum: TripStatus })
  currentStatus: TripStatus;

  @ApiProperty()
  initialStatusTime: Date;

  @ApiPropertyOptional({ nullable: true })
  finalStatusTime: Date | null;

  @ApiPropertyOptional({ nullable: true })
  actualStartTime: Date | null;

  @ApiPropertyOptional({ nullable: true })
  actualEndTime: Date | null;

  @ApiPropertyOptional({ nullable: true })
  initialSnapshot: any;

  @ApiPropertyOptional({ nullable: true })
  finalSnapshot: any;

  static fromTrip(trip: Trip): TripResponseDto {
    const dto = new TripResponseDto();
    dto.id = trip.id;
    dto.scheduleId = trip.scheduleId;
    dto.tripDate = trip.tripDate;
    dto.currentStatus = trip.currentStatus;
    dto.initialStatusTime = trip.initialStatusTime;
    dto.finalStatusTime = trip.finalStatusTime;
    dto.actualStartTime = trip.actualStartTime;
    dto.actualEndTime = trip.actualEndTime;
    dto.initialSnapshot = trip.initialSnapshot;
    dto.finalSnapshot = trip.finalSnapshot;
    return dto;
  }
}
