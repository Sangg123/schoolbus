import { ApiProperty } from '@nestjs/swagger';
import { Driver } from '@prisma/client';

export class DriverResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  citizenId: string;

  @ApiProperty()
  licenseId: string;

  static fromDriver(driver: Driver): DriverResponseDto {
    const dto = new DriverResponseDto();
    dto.id = driver.id;
    dto.userId = driver.userId;
    dto.citizenId = driver.citizenId;
    dto.licenseId = driver.licenseId;
    return dto;
  }
}
