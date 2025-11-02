import { ApiProperty } from '@nestjs/swagger';
import { PageableResponseDto } from '../../../core/dto/pageable-response.dto';
import { AdminResponseDto } from './admin-response.dto';

export class PageableAdminResponseDto extends PageableResponseDto<AdminResponseDto> {
  @ApiProperty({ type: [AdminResponseDto] })
  declare data: AdminResponseDto[];
}
