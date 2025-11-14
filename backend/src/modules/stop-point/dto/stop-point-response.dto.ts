import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StopPoint } from '@prisma/client';

export class StopPointResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional({ nullable: true })
  address: string | null;

  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;

  static fromStopPoint(stopPoint: StopPoint): StopPointResponseDto {
    const dto = new StopPointResponseDto();
    dto.id = stopPoint.id;
    dto.name = stopPoint.name;
    dto.address = stopPoint.address;
    dto.latitude = Number(stopPoint.latitude);
    dto.longitude = Number(stopPoint.longitude);
    return dto;
  }
}
