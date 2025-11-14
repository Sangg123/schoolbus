import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsDateString, IsOptional, IsEnum, IsString, IsBoolean } from 'class-validator';
import { NotificationTypeEnum } from 'src/core/enums/notification-type.enum';

export class CreateNotificationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  senderId?: number;

  @ApiProperty()
  @IsInt()
  receiverId: number;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty({ enum: NotificationTypeEnum })
  @IsEnum(NotificationTypeEnum)
  type: NotificationTypeEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isRead?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  sentTime?: string;
}
