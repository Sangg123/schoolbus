import { Module } from '@nestjs/common';
import { LocationEventController } from './location-event.controller';
import { LocationEventRepository } from './location-event.repository';
import { LocationEventService } from './location-event.service';

@Module({
  controllers: [LocationEventController],
  providers: [LocationEventService, LocationEventRepository],
  exports: [LocationEventService],
})
export class LocationEventModule {}
