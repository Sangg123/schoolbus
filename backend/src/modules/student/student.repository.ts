import { Injectable } from '@nestjs/common';
import { Prisma, Student } from '@prisma/client';
import { PrismaService } from '../../core/prisma/prisma.service';
import { BaseRepository } from '../../core/repositories/base.repository';

@Injectable()
export class StudentRepository extends BaseRepository<
  Student,
  Prisma.StudentCreateInput,
  Prisma.StudentUpdateInput,
  Prisma.StudentWhereInput
> {
  protected readonly prisma: PrismaService;
  protected readonly model = 'student';

  constructor(prisma: PrismaService) {
    super();
    this.prisma = prisma;
  }
}
