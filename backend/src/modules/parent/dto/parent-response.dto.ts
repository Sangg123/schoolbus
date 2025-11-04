import { ApiProperty } from '@nestjs/swagger';
import { Parent } from '@prisma/client';

export class ParentResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  citizenId: string;

  static fromParent(parent: Parent): ParentResponseDto {
    const dto = new ParentResponseDto();
    dto.id = parent.id;
    dto.userId = parent.userId;
    dto.citizenId = parent.citizenId;
    return dto;
  }
}
