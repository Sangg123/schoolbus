import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { BaseRepository } from '../../core/repositories/base.repository';
import { Trip, Prisma } from '@prisma/client';

@Injectable()
export class TripRepository extends BaseRepository<
  Trip,
  Prisma.TripCreateInput,
  Prisma.TripUpdateInput,
  Prisma.TripWhereInput
> {
  protected readonly prisma: PrismaService;
  protected readonly model = 'trip';

  constructor(prisma: PrismaService) {
    super();
    this.prisma = prisma;
  }
}
