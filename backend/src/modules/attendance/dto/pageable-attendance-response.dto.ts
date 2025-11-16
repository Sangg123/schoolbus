import { ApiProperty } from '@nestjs/swagger';
import { PageableResponseDto } from '../../../core/dto/pageable-response.dto';
import { AttendanceResponseDto } from './attendance-response.dto';

export class PageableAttendanceResponseDto extends PageableResponseDto<AttendanceResponseDto> {
  @ApiProperty({ type: [AttendanceResponseDto] })
  declare data: AttendanceResponseDto[];
}
