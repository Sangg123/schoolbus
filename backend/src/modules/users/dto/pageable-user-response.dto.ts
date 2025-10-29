import { ApiProperty } from '@nestjs/swagger';
import { PageableResponseDto } from '../../../core/dto/pageable-response.dto';
import { UserResponseDto } from './user-response.dto';

export class PageableUserResponseDto extends PageableResponseDto<UserResponseDto> {
  @ApiProperty({ type: [UserResponseDto] })
  declare data: UserResponseDto[];
}
