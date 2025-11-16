import { ApiProperty } from '@nestjs/swagger';
import { PageableResponseDto } from '../../../core/dto/pageable-response.dto';
import { ParentStudentResponseDto } from './parent-student-response.dto';

export class PageableParentStudentResponseDto extends PageableResponseDto<ParentStudentResponseDto> {
  @ApiProperty({ type: [ParentStudentResponseDto] })
  declare data: ParentStudentResponseDto[];
}
