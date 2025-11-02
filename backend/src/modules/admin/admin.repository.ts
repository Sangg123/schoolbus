import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { BaseRepository } from '../../core/repositories/base.repository';
import { Admin, Prisma } from '@prisma/client';

@Injectable()
export class AdminRepository extends BaseRepository<
  Admin,
  Prisma.AdminCreateInput,
  Prisma.AdminUpdateInput,
  Prisma.AdminWhereInput
> {
  protected readonly prisma: PrismaService;
  protected readonly model = 'admin';

  constructor(prisma: PrismaService) {
    super();
    this.prisma = prisma;
  }
}
