import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { BaseRepository } from '../../core/repositories/base.repository';
import { LocationEvent, Prisma } from '@prisma/client';

@Injectable()
export class LocationEventRepository extends BaseRepository<
  LocationEvent,
  Prisma.LocationEventCreateInput,
  Prisma.LocationEventUpdateInput,
  Prisma.LocationEventWhereInput
> {
  protected readonly prisma: PrismaService;
  protected readonly model = 'locationEvent';

  constructor(prisma: PrismaService) {
    super();
    this.prisma = prisma;
  }
}
