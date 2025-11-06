import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Route } from '@prisma/client';

export class RouteResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional({ nullable: true })
  description: string | null;

  static fromRoute(route: Route): RouteResponseDto {
    const dto = new RouteResponseDto();
    dto.id = route.id;
    dto.name = route.name;
    dto.description = route.description;
    return dto;
  }
}
