import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateParentDto {
  @ApiProperty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsString()
  citizenId: string;
}
