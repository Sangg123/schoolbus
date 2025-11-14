import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { NotificationRepository } from './notification.repository';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationResponseDto } from './dto/notification-response.dto';
import { QueryNotificationDto } from './dto/query-notification.dto';
import { PaginatedQueryNotificationDto } from './dto/paginated-query-notification.dto';
import { Prisma } from '@prisma/client';
import { PageableNotificationResponseDto } from './dto/pageable-notification-response.dto';

@Injectable()
export class NotificationService {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<NotificationResponseDto> {
    const notification = await this.notificationRepository.create({
      sender: createNotificationDto.senderId ? {
        connect: {
          id: createNotificationDto.senderId,
        },
      } : undefined,
      receiver: {
        connect: {
          id: createNotificationDto.receiverId,
        },
      },
      content: createNotificationDto.content,
      type: createNotificationDto.type,
      isRead: createNotificationDto.isRead,
      sentTime: createNotificationDto.sentTime,
    });
    return NotificationResponseDto.fromNotification(notification);
  }

  async findAll(query: QueryNotificationDto): Promise<NotificationResponseDto[]> {
    const filter = this.buildFilter(query);
    const notifications = await this.notificationRepository.findByFilter(filter);
    return notifications.map(NotificationResponseDto.fromNotification);
  }

  async findAllWithPagination(
    query: PaginatedQueryNotificationDto,
  ): Promise<PageableNotificationResponseDto> {
    const { page, limit, sortBy, sortOrder, ...filterData } = query;
    const filter = this.buildFilter(filterData);
    const pagination = { page, limit, sortBy, sortOrder };

    const result = await this.notificationRepository.findByFilterWithPagination(
      filter,
      pagination,
    );

    return {
      ...result,
      data: result.data.map(NotificationResponseDto.fromNotification),
    };
  }

  async findOne(id: number): Promise<NotificationResponseDto> {
    const notification = await this.notificationRepository.findById(id);
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
    return NotificationResponseDto.fromNotification(notification);
  }

  async update(
    id: number,
    updateNotificationDto: UpdateNotificationDto,
  ): Promise<NotificationResponseDto> {
    const notification = await this.notificationRepository.findById(id);
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }

    const updatedNotification = await this.notificationRepository.update(id, {
      sender: updateNotificationDto.senderId ? {
        connect: {
          id: updateNotificationDto.senderId,
        },
      } : updateNotificationDto.senderId === null ? { disconnect: true } : undefined,
      receiver: updateNotificationDto.receiverId ? {
        connect: {
          id: updateNotificationDto.receiverId,
        },
      } : undefined,
      content: updateNotificationDto.content,
      type: updateNotificationDto.type,
      isRead: updateNotificationDto.isRead,
      sentTime: updateNotificationDto.sentTime,
    });
    return NotificationResponseDto.fromNotification(updatedNotification);
  }

  async remove(id: number): Promise<void> {
    const notification = await this.notificationRepository.findById(id);
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
    await this.notificationRepository.delete(id);
  }

  private buildFilter(query: QueryNotificationDto): Prisma.NotificationWhereInput {
    const filter: Prisma.NotificationWhereInput = {};

    if (query.senderId) {
      filter.senderId = query.senderId;
    }

    if (query.receiverId) {
      filter.receiverId = query.receiverId;
    }

    if (query.type) {
      filter.type = query.type;
    }

    if (query.isRead !== undefined) {
      filter.isRead = query.isRead;
    }

    if (query.sentTimeFrom || query.sentTimeTo) {
      filter.sentTime = {};
      if (query.sentTimeFrom) filter.sentTime.gte = new Date(query.sentTimeFrom);
      if (query.sentTimeTo) filter.sentTime.lte = new Date(query.sentTimeTo);
    }

    if (query.content) {
      filter.content = { contains: query.content, mode: 'insensitive' };
    }

    if (query.senderName) {
      filter.sender = {
        fullName: { contains: query.senderName, mode: 'insensitive' },
      };
    }

    if (query.receiverName) {
      filter.receiver = {
        fullName: { contains: query.receiverName, mode: 'insensitive' },
      };
    }

    return filter;
  }
}
