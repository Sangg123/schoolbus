import { ApiProperty } from '@nestjs/swagger';
import { PageableResponseDto } from '../../../core/dto/pageable-response.dto';
import { ParentResponseDto } from './parent-response.dto';

export class PageableParentResponseDto extends PageableResponseDto<ParentResponseDto> {
  @ApiProperty({ type: [ParentResponseDto] })
  declare data: ParentResponseDto[];
}
