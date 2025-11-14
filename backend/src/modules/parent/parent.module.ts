import { Module } from '@nestjs/common';
import { ParentController } from './parent.controller';
import { ParentRepository } from './parent.repository';
import { ParentService } from './parent.service';

@Module({
  controllers: [ParentController],
  providers: [ParentService, ParentRepository],
  exports: [ParentService],
})
export class ParentModule {}
