import { Module } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';
import { TripRepository } from './trip.repository';

@Module({
  controllers: [TripController],
  providers: [TripService, TripRepository],
  exports: [TripService],
})
export class TripModule {}
