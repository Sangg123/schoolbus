import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { BaseRepository } from '../../core/repositories/base.repository';
import { Route, Prisma } from '@prisma/client';

@Injectable()
export class RouteRepository extends BaseRepository<
  Route,
  Prisma.RouteCreateInput,
  Prisma.RouteUpdateInput,
  Prisma.RouteWhereInput
> {
  protected readonly prisma: PrismaService;
  protected readonly model = 'route';

  constructor(prisma: PrismaService) {
    super();
    this.prisma = prisma;
  }
}
