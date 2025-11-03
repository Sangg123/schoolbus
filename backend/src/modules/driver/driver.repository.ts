import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { BaseRepository } from '../../core/repositories/base.repository';
import { Driver, Prisma } from '@prisma/client';

@Injectable()
export class DriverRepository extends BaseRepository<
  Driver,
  Prisma.DriverCreateInput,
  Prisma.DriverUpdateInput,
  Prisma.DriverWhereInput
> {
  protected readonly prisma: PrismaService;
  protected readonly model = 'driver';

  constructor(prisma: PrismaService) {
    super();
    this.prisma = prisma;
  }
}
