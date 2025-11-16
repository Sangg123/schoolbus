import { Module } from '@nestjs/common';
import { ParentStudentController } from './parent-student.controller';
import { ParentStudentRepository } from './parent-student.repository';
import { ParentStudentService } from './parent-student.service';

@Module({
  controllers: [ParentStudentController],
  providers: [ParentStudentService, ParentStudentRepository],
  exports: [ParentStudentService],
})
export class ParentStudentModule {}
