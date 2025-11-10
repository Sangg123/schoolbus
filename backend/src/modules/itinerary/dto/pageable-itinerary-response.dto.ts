import { ApiProperty } from '@nestjs/swagger';
import { PageableResponseDto } from '../../../core/dto/pageable-response.dto';
import { ItineraryResponseDto } from './itinerary-response.dto';

export class PageableItineraryResponseDto extends PageableResponseDto<ItineraryResponseDto> {
  @ApiProperty({ type: [ItineraryResponseDto] })
  declare data: ItineraryResponseDto[];
}
