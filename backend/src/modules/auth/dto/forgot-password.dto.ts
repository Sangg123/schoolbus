import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({ description: 'Email or phone number to search for user' })
  @IsString()
  emailOrPhone: string;
}
