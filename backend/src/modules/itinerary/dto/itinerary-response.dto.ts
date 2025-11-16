import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Itinerary } from '@prisma/client';

export class ItineraryResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  routeId: number;

  @ApiProperty()
  stopId: number;

  @ApiProperty()
  stopOrder: number;

  @ApiPropertyOptional({ nullable: true })
  estimatedTime: Date | null;

  static fromItinerary(itinerary: Itinerary): ItineraryResponseDto {
    const dto = new ItineraryResponseDto();
    dto.id = itinerary.id;
    dto.routeId = itinerary.routeId;
    dto.stopId = itinerary.stopId;
    dto.stopOrder = itinerary.stopOrder;
    dto.estimatedTime = itinerary.estimatedTime;
    return dto;
  }
}
