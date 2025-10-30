import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRoleEnum } from 'src/core/enums/user-role.enum';

export class QueryUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ enum: UserRoleEnum })
  @IsOptional()
  @IsEnum(UserRoleEnum)
  role?: UserRoleEnum;
}
