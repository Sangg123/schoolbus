import { ApiProperty } from '@nestjs/swagger';
import { PageableResponseDto } from '../../../core/dto/pageable-response.dto';
import { DriverResponseDto } from './driver-response.dto';

export class PageableDriverResponseDto extends PageableResponseDto<DriverResponseDto> {
  @ApiProperty({ type: [DriverResponseDto] })
  declare data: DriverResponseDto[];
}
