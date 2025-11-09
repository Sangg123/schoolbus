import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { ScheduleRepository } from './schedule.repository';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService, ScheduleRepository],
  exports: [ScheduleService],
})
export class ScheduleModule {}
