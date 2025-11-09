import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { BaseRepository } from '../../core/repositories/base.repository';
import { Schedule, Prisma } from '@prisma/client';

@Injectable()
export class ScheduleRepository extends BaseRepository<
  Schedule,
  Prisma.ScheduleCreateInput,
  Prisma.ScheduleUpdateInput,
  Prisma.ScheduleWhereInput
> {
  protected readonly prisma: PrismaService;
  protected readonly model = 'schedule';

  constructor(prisma: PrismaService) {
    super();
    this.prisma = prisma;
  }
}
