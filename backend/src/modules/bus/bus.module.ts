import { Module } from '@nestjs/common';
import { BusController } from './bus.controller';
import { BusRepository } from './bus.repository';
import { BusService } from './bus.service';

@Module({
  controllers: [BusController],
  providers: [BusService, BusRepository],
  exports: [BusService],
})
export class BusModule {}
