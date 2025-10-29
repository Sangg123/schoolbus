import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'Email or phone number' })
  @IsString()
  identifier: string; // Changed from email

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;
}
