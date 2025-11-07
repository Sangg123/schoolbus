import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { BaseRepository } from '../../core/repositories/base.repository';
import { ParentStudent, Prisma } from '@prisma/client';

@Injectable()
export class ParentStudentRepository extends BaseRepository<
  ParentStudent,
  Prisma.ParentStudentCreateInput,
  Prisma.ParentStudentUpdateInput,
  Prisma.ParentStudentWhereInput
> {
  protected readonly prisma: PrismaService;
  protected readonly model = 'parentStudent';

  constructor(prisma: PrismaService) {
    super();
    this.prisma = prisma;
  }
}
