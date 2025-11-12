import { ApiProperty } from '@nestjs/swagger';
import { PageableResponseDto } from '../../../core/dto/pageable-response.dto';
import { LocationEventResponseDto } from './location-event-response.dto';

export class PageableLocationEventResponseDto extends PageableResponseDto<LocationEventResponseDto> {
  @ApiProperty({ type: [LocationEventResponseDto] })
  declare data: LocationEventResponseDto[];
}
