import { Module } from '@nestjs/common';
import { LocationEventService } from './location-event.service';
import { LocationEventController } from './location-event.controller';
import { LocationEventRepository } from './location-event.repository';

@Module({
  controllers: [LocationEventController],
  providers: [LocationEventService, LocationEventRepository],
  exports: [LocationEventService],
})
export class LocationEventModule {}
