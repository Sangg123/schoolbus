import { Module } from '@nestjs/common';
import { ItineraryController } from './itinerary.controller';
import { ItineraryRepository } from './itinerary.repository';
import { ItineraryService } from './itinerary.service';

@Module({
  controllers: [ItineraryController],
  providers: [ItineraryService, ItineraryRepository],
  exports: [ItineraryService],
})
export class ItineraryModule {}
