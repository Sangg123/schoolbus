import { Module } from '@nestjs/common';
import { ParentStudentService } from './parent-student.service';
import { ParentStudentController } from './parent-student.controller';
import { ParentStudentRepository } from './parent-student.repository';

@Module({
  controllers: [ParentStudentController],
  providers: [ParentStudentService, ParentStudentRepository],
  exports: [ParentStudentService],
})
export class ParentStudentModule {}
