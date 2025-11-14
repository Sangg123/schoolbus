import { Module } from '@nestjs/common';
import { TripController } from './trip.controller';
import { TripRepository } from './trip.repository';
import { TripService } from './trip.service';

@Module({
  controllers: [TripController],
  providers: [TripService, TripRepository],
  exports: [TripService],
})
export class TripModule {}
