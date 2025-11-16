import { ApiProperty } from '@nestjs/swagger';
import { PageableResponseDto } from '../../../core/dto/pageable-response.dto';
import { RouteResponseDto } from './route-response.dto';

export class PageableRouteResponseDto extends PageableResponseDto<RouteResponseDto> {
  @ApiProperty({ type: [RouteResponseDto] })
  declare data: RouteResponseDto[];
}
