import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Bus } from '@prisma/client';

export class BusResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  licensePlate: string;

  @ApiPropertyOptional({ nullable: true })
  capacity: number | null;

  @ApiPropertyOptional({ nullable: true })
  currentLat: number | null;

  @ApiPropertyOptional({ nullable: true })
  currentLng: number | null;

  @ApiPropertyOptional({ nullable: true })
  lastUpdated: Date | null;

  static fromBus(bus: Bus): BusResponseDto {
    const dto = new BusResponseDto();
    dto.id = bus.id;
    dto.licensePlate = bus.licensePlate;
    dto.capacity = bus.capacity;
    dto.currentLat = bus.currentLat ? Number(bus.currentLat) : null;
    dto.currentLng = bus.currentLng ? Number(bus.currentLng) : null;
    dto.lastUpdated = bus.lastUpdated;
    return dto;
  }
}
