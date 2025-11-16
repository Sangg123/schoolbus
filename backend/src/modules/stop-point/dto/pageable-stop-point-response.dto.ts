import { ApiProperty } from '@nestjs/swagger';
import { PageableResponseDto } from '../../../core/dto/pageable-response.dto';
import { StopPointResponseDto } from './stop-point-response.dto';

export class PageableStopPointResponseDto extends PageableResponseDto<StopPointResponseDto> {
  @ApiProperty({ type: [StopPointResponseDto] })
  declare data: StopPointResponseDto[];
}
