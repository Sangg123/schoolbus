import { Injectable } from '@nestjs/common';
import { Parent, Prisma } from '@prisma/client';
import { PrismaService } from '../../core/prisma/prisma.service';
import { BaseRepository } from '../../core/repositories/base.repository';

@Injectable()
export class ParentRepository extends BaseRepository<
  Parent,
  Prisma.ParentCreateInput,
  Prisma.ParentUpdateInput,
  Prisma.ParentWhereInput
> {
  protected readonly prisma: PrismaService;
  protected readonly model = 'parent';

  constructor(prisma: PrismaService) {
    super();
    this.prisma = prisma;
  }
}
