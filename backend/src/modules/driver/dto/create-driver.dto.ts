import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateDriverDto {
  @ApiProperty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsString()
  citizenId: string;

  @ApiProperty()
  @IsString()
  licenseId: string;
}
