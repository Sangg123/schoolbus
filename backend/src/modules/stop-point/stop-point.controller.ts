import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from '../../core/decorators/roles.decorator';
import { CreateStopPointDto } from './dto/create-stop-point.dto';
import { PageableStopPointResponseDto } from './dto/pageable-stop-point-response.dto';
import { PaginatedQueryStopPointDto } from './dto/paginated-query-stop-point.dto';
import { QueryStopPointDto } from './dto/query-stop-point.dto';
import { StopPointResponseDto } from './dto/stop-point-response.dto';
import { UpdateStopPointDto } from './dto/update-stop-point.dto';
import { StopPointService } from './stop-point.service';

@ApiTags('stop-point')
@ApiBearerAuth()
@Controller('stop-point')
@Roles(UserRole.admin)
export class StopPointController {
  constructor(private readonly stopPointService: StopPointService) {}

  @Post()
  @ApiOperation({ summary: 'Create stop point' })
  @ApiResponse({ status: 201, type: StopPointResponseDto })
  create(@Body() createStopPointDto: CreateStopPointDto) {
    return this.stopPointService.create(createStopPointDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all stop points (non-paginated)' })
  @ApiResponse({ status: 200, type: [StopPointResponseDto] })
  findAll(@Query() query: QueryStopPointDto) {
    return this.stopPointService.findAll(query);
  }

  @Get('paginated')
  @ApiOperation({ summary: 'Get all stop points (paginated)' })
  @ApiResponse({ status: 200, type: PageableStopPointResponseDto })
  findAllPaginated(@Query() query: PaginatedQueryStopPointDto) {
    return this.stopPointService.findAllWithPagination(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get stop point by ID' })
  @ApiResponse({ status: 200, type: StopPointResponseDto })
  findOne(@Param('id') id: string) {
    return this.stopPointService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update stop point' })
  @ApiResponse({ status: 200, type: StopPointResponseDto })
  update(
    @Param('id') id: string,
    @Body() updateStopPointDto: UpdateStopPointDto,
  ) {
    return this.stopPointService.update(+id, updateStopPointDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete stop point' })
  remove(@Param('id') id: string) {
    return this.stopPointService.remove(+id);
  }
}
