import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { BaseRepository } from '../../core/repositories/base.repository';
import { StopPoint, Prisma } from '@prisma/client';

@Injectable()
export class StopPointRepository extends BaseRepository<
  StopPoint,
  Prisma.StopPointCreateInput,
  Prisma.StopPointUpdateInput,
  Prisma.StopPointWhereInput
> {
  protected readonly prisma: PrismaService;
  protected readonly model = 'stopPoint';

  constructor(prisma: PrismaService) {
    super();
    this.prisma = prisma;
  }
}
