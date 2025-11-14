import { ApiProperty } from '@nestjs/swagger';
import { PageableResponseDto } from '../../../core/dto/pageable-response.dto';
import { StudentScheduleResponseDto } from './student-schedule-response.dto';

export class PageableStudentScheduleResponseDto extends PageableResponseDto<StudentScheduleResponseDto> {
  @ApiProperty({ type: [StudentScheduleResponseDto] })
  declare data: StudentScheduleResponseDto[];
}
