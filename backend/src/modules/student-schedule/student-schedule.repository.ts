import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { BaseRepository } from '../../core/repositories/base.repository';
import { StudentSchedule, Prisma } from '@prisma/client';

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
