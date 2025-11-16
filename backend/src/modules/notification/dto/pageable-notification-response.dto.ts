import { ApiProperty } from '@nestjs/swagger';
import { PageableResponseDto } from '../../../core/dto/pageable-response.dto';
import { NotificationResponseDto } from './notification-response.dto';

export class PageableNotificationResponseDto extends PageableResponseDto<NotificationResponseDto> {
  @ApiProperty({ type: [NotificationResponseDto] })
  declare data: NotificationResponseDto[];
}
