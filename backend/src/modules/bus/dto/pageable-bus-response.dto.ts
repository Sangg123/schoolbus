import { ApiProperty } from '@nestjs/swagger';
import { PageableResponseDto } from '../../../core/dto/pageable-response.dto';
import { BusResponseDto } from './bus-response.dto';

export class PageableBusResponseDto extends PageableResponseDto<BusResponseDto> {
  @ApiProperty({ type: [BusResponseDto] })
  declare data: BusResponseDto[];
}
