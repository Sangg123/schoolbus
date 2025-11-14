import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LocationEvent, LocationSource } from '@prisma/client';

export class LocationEventResponseDto {
  @ApiProperty()
  id: number;

  @ApiPropertyOptional({ nullable: true })
  tripId: number | null;

  @ApiProperty()
  busId: number;

  @ApiProperty()
  timestamp: Date;

  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;

  @ApiPropertyOptional({ nullable: true })
  speedKph: number | null;

  @ApiPropertyOptional({ nullable: true })
  heading: number | null;

  @ApiProperty({ enum: LocationSource })
  source: LocationSource;

  static fromLocationEvent(
    locationEvent: LocationEvent,
  ): LocationEventResponseDto {
    const dto = new LocationEventResponseDto();
    dto.id = locationEvent.id;
    dto.tripId = locationEvent.tripId;
    dto.busId = locationEvent.busId;
    dto.timestamp = locationEvent.timestamp;
    dto.latitude = Number(locationEvent.latitude);
    dto.longitude = Number(locationEvent.longitude);
    dto.speedKph = locationEvent.speedKph;
    dto.heading = locationEvent.heading;
    dto.source = locationEvent.source;
    return dto;
  }
}
