import { Module } from '@nestjs/common';
import { ItineraryService } from './itinerary.service';
import { ItineraryController } from './itinerary.controller';
import { ItineraryRepository } from './itinerary.repository';

@Module({
  controllers: [ItineraryController],
  providers: [ItineraryService, ItineraryRepository],
  exports: [ItineraryService],
})
export class ItineraryModule {}
