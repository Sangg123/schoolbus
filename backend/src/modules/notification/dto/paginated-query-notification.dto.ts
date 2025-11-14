import { IntersectionType } from '@nestjs/swagger';
import { QueryNotificationDto } from './query-notification.dto';
import { BaseQueryDto } from '../../../core/dto/base-query.dto';

export class PaginatedQueryNotificationDto extends IntersectionType(
  QueryNotificationDto,
  BaseQueryDto,
) {}
