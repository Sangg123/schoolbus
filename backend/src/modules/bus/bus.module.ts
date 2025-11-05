import { Module } from '@nestjs/common';
import { BusService } from './bus.service';
import { BusController } from './bus.controller';
import { BusRepository } from './bus.repository';

@Module({
  controllers: [BusController],
  providers: [BusService, BusRepository],
  exports: [BusService],
})
export class BusModule {}
