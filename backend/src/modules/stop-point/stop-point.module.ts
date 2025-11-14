import { Module } from '@nestjs/common';
import { StopPointController } from './stop-point.controller';
import { StopPointRepository } from './stop-point.repository';
import { StopPointService } from './stop-point.service';

@Module({
  controllers: [StopPointController],
  providers: [StopPointService, StopPointRepository],
  exports: [StopPointService],
})
export class StopPointModule {}
