import { ApiProperty } from '@nestjs/swagger';

export class PageableMetaDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  sortBy: string;

  @ApiProperty({
    enum: ['asc', 'desc'],
    description: 'Sort order: asc or desc',
    example: 'asc',
  })
  sortOrder: 'asc' | 'desc';

  @ApiProperty()
  total: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  hasNext: boolean;

  @ApiProperty()
  hasPrevious: boolean;
}

export class PageableResponseDto<T> {
  @ApiProperty({ type: [Object] })
  data: T[];

  @ApiProperty()
  meta: PageableMetaDto;
}
