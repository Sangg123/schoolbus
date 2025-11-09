import { Module } from '@nestjs/common';
import { StudentScheduleController } from './student-schedule.controller';
import { StudentScheduleRepository } from './student-schedule.repository';
import { StudentScheduleService } from './student-schedule.service';

@Module({
  controllers: [StudentScheduleController],
  providers: [StudentScheduleService, StudentScheduleRepository],
  exports: [StudentScheduleService],
})
export class StudentScheduleModule {}
