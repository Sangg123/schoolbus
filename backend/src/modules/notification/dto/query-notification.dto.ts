import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { NotificationTypeEnum } from 'src/core/enums/notification-type.enum';

export class QueryNotificationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  senderId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  receiverId?: number;

  @ApiPropertyOptional({ enum: NotificationTypeEnum })
  @IsOptional()
  @IsEnum(NotificationTypeEnum)
  type?: NotificationTypeEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isRead?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  sentTimeFrom?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  sentTimeTo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  senderName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  receiverName?: string;
}
