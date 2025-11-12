import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LocationEventService } from './location-event.service';
import { CreateLocationEventDto } from './dto/create-location-event.dto';
import { UpdateLocationEventDto } from './dto/update-location-event.dto';
import { QueryLocationEventDto } from './dto/query-location-event.dto';
import { PaginatedQueryLocationEventDto } from './dto/paginated-query-location-event.dto';
import { LocationEventResponseDto } from './dto/location-event-response.dto';
import { Roles } from '../../core/decorators/roles.decorator';
import { UserRoleEnum } from 'src/core/enums/user-role.enum';
import { PageableLocationEventResponseDto } from './dto/pageable-location-event-response.dto';

@ApiTags('location-event')
@ApiBearerAuth()
@Controller('location-event')
@Roles(UserRoleEnum.admin)
export class LocationEventController {
  constructor(private readonly locationEventService: LocationEventService) {}

  @Post()
  @ApiOperation({ summary: 'Create location event' })
  @ApiResponse({ status: 201, type: LocationEventResponseDto })
  create(@Body() createLocationEventDto: CreateLocationEventDto) {
    return this.locationEventService.create(createLocationEventDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all location events (non-paginated)' })
  @ApiResponse({ status: 200, type: [LocationEventResponseDto] })
  findAll(@Query() query: QueryLocationEventDto) {
    return this.locationEventService.findAll(query);
  }

  @Get('paginated')
  @ApiOperation({ summary: 'Get all location events (paginated)' })
  @ApiResponse({ status: 200, type: PageableLocationEventResponseDto })
  findAllPaginated(@Query() query: PaginatedQueryLocationEventDto) {
    return this.locationEventService.findAllWithPagination(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get location event by ID' })
  @ApiResponse({ status: 200, type: LocationEventResponseDto })
  findOne(@Param('id') id: string) {
    return this.locationEventService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update location event' })
  @ApiResponse({ status: 200, type: LocationEventResponseDto })
  update(@Param('id') id: string, @Body() updateLocationEventDto: UpdateLocationEventDto) {
    return this.locationEventService.update(+id, updateLocationEventDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete location event' })
  remove(@Param('id') id: string) {
    return this.locationEventService.remove(+id);
  }
}
