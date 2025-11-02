import { ApiProperty } from '@nestjs/swagger';
import { Admin } from '@prisma/client';

export class AdminResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  static fromAdmin(admin: Admin): AdminResponseDto {
    const dto = new AdminResponseDto();
    dto.id = admin.id;
    dto.userId = admin.userId;
    return dto;
  }
}
