import { ApiProperty } from '@nestjs/swagger';
import { PageableResponseDto } from '../../../core/dto/pageable-response.dto';
import { TripResponseDto } from './trip-response.dto';

export class PageableTripResponseDto extends PageableResponseDto<TripResponseDto> {
  @ApiProperty({ type: [TripResponseDto] })
  declare data: TripResponseDto[];
}
