import { IntersectionType } from '@nestjs/swagger';
import { BaseQueryDto } from '../../../core/dto/base-query.dto';
import { QueryNotificationDto } from './query-notification.dto';

export class PaginatedQueryNotificationDto extends IntersectionType(
  QueryNotificationDto,
  BaseQueryDto,
) {}
