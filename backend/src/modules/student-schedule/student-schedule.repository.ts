import { Injectable } from '@nestjs/common';
import { Prisma, StudentSchedule } from '@prisma/client';
import { PrismaService } from '../../core/prisma/prisma.service';
import { BaseRepository } from '../../core/repositories/base.repository';

@Injectable()
export class StudentScheduleRepository extends BaseRepository<
  StudentSchedule,
  Prisma.StudentScheduleCreateInput,
  Prisma.StudentScheduleUpdateInput,
  Prisma.StudentScheduleWhereInput
> {
  protected readonly prisma: PrismaService;
  protected readonly model = 'studentSchedule';

  constructor(prisma: PrismaService) {
    super();
    this.prisma = prisma;
  }
}
