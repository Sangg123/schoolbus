import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { BaseRepository } from '../../core/repositories/base.repository';
import { Attendance, Prisma } from '@prisma/client';

@Injectable()
export class AttendanceRepository extends BaseRepository<
  Attendance,
  Prisma.AttendanceCreateInput,
  Prisma.AttendanceUpdateInput,
  Prisma.AttendanceWhereInput
> {
  protected readonly prisma: PrismaService;
  protected readonly model = 'attendance';

  constructor(prisma: PrismaService) {
    super();
    this.prisma = prisma;
  }
}
