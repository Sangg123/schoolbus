import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Notification, NotificationType } from '@prisma/client';

export class NotificationResponseDto {
  @ApiProperty()
  id: number;

  @ApiPropertyOptional({ nullable: true })
  senderId: number | null;

  @ApiProperty()
  receiverId: number;

  @ApiProperty()
  content: string;

  @ApiProperty({ enum: NotificationType })
  type: NotificationType;

  @ApiProperty()
  isRead: boolean;

  @ApiProperty()
  sentTime: Date;

  static fromNotification(notification: Notification): NotificationResponseDto {
    const dto = new NotificationResponseDto();
    dto.id = notification.id;
    dto.senderId = notification.senderId;
    dto.receiverId = notification.receiverId;
    dto.content = notification.content;
    dto.type = notification.type;
    dto.isRead = notification.isRead;
    dto.sentTime = notification.sentTime;
    return dto;
  }
}
