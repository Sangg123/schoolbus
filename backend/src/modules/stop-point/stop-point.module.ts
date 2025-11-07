import { Module } from '@nestjs/common';
import { StopPointService } from './stop-point.service';
import { StopPointController } from './stop-point.controller';
import { StopPointRepository } from './stop-point.repository';

@Module({
  controllers: [StopPointController],
  providers: [StopPointService, StopPointRepository],
  exports: [StopPointService],
})
export class StopPointModule {}
