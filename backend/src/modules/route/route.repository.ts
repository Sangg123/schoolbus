import { Injectable } from '@nestjs/common';
import { Prisma, Route } from '@prisma/client';
import { PrismaService } from '../../core/prisma/prisma.service';
import { BaseRepository } from '../../core/repositories/base.repository';

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
