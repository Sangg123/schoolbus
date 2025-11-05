import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { BaseRepository } from '../../core/repositories/base.repository';
import { Bus, Prisma } from '@prisma/client';

@Injectable()
export class BusRepository extends BaseRepository<
  Bus,
  Prisma.BusCreateInput,
  Prisma.BusUpdateInput,
  Prisma.BusWhereInput
> {
  protected readonly prisma: PrismaService;
  protected readonly model = 'bus';

  constructor(prisma: PrismaService) {
    super();
    this.prisma = prisma;
  }
}
