import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty()
  @IsInt()
  userId: number;
}
