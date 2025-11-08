import { Module } from '@nestjs/common';
import { StudentScheduleService } from './student-schedule.service';
import { StudentScheduleController } from './student-schedule.controller';
import { StudentScheduleRepository } from './student-schedule.repository';

@Module({
  controllers: [StudentScheduleController],
  providers: [StudentScheduleService, StudentScheduleRepository],
  exports: [StudentScheduleService],
})
export class StudentScheduleModule {}
