import { Injectable } from '@nestjs/common';
import { Itinerary, Prisma } from '@prisma/client';
import { PrismaService } from '../../core/prisma/prisma.service';
import { BaseRepository } from '../../core/repositories/base.repository';

@Injectable()
export class ItineraryRepository extends BaseRepository<
  Itinerary,
  Prisma.ItineraryCreateInput,
  Prisma.ItineraryUpdateInput,
  Prisma.ItineraryWhereInput
> {
  protected readonly prisma: PrismaService;
  protected readonly model = 'itinerary';

  constructor(prisma: PrismaService) {
    super();
    this.prisma = prisma;
  }
}
