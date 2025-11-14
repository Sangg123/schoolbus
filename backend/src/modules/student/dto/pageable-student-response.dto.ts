import { ApiProperty } from '@nestjs/swagger';
import { PageableResponseDto } from '../../../core/dto/pageable-response.dto';
import { StudentResponseDto } from './student-response.dto';

export class PageableStudentResponseDto extends PageableResponseDto<StudentResponseDto> {
  @ApiProperty({ type: [StudentResponseDto] })
  declare data: StudentResponseDto[];
}
