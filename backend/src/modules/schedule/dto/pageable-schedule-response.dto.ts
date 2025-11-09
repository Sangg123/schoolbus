import { ApiProperty } from '@nestjs/swagger';
import { PageableResponseDto } from '../../../core/dto/pageable-response.dto';
import { ScheduleResponseDto } from './schedule-response.dto';

export class PageableScheduleResponseDto extends PageableResponseDto<ScheduleResponseDto> {
  @ApiProperty({ type: [ScheduleResponseDto] })
  declare data: ScheduleResponseDto[];
}
