import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { BaseRepository } from '../../core/repositories/base.repository';
import { Notification, Prisma } from '@prisma/client';

@Injectable()
export class NotificationRepository extends BaseRepository<
  Notification,
  Prisma.NotificationCreateInput,
  Prisma.NotificationUpdateInput,
  Prisma.NotificationWhereInput
> {
  protected readonly prisma: PrismaService;
  protected readonly model = 'notification';

  constructor(prisma: PrismaService) {
    super();
    this.prisma = prisma;
  }
}
