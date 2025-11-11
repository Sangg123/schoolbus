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
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { QueryTripDto } from './dto/query-trip.dto';
import { PaginatedQueryTripDto } from './dto/paginated-query-trip.dto';
import { TripResponseDto } from './dto/trip-response.dto';
import { Roles } from '../../core/decorators/roles.decorator';
import { UserRoleEnum } from 'src/core/enums/user-role.enum';
import { PageableTripResponseDto } from './dto/pageable-trip-response.dto';

@ApiTags('trip')
@ApiBearerAuth()
@Controller('trip')
@Roles(UserRoleEnum.admin)
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @ApiOperation({ summary: 'Create trip' })
  @ApiResponse({ status: 201, type: TripResponseDto })
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all trips (non-paginated)' })
  @ApiResponse({ status: 200, type: [TripResponseDto] })
  findAll(@Query() query: QueryTripDto) {
    return this.tripService.findAll(query);
  }

  @Get('paginated')
  @ApiOperation({ summary: 'Get all trips (paginated)' })
  @ApiResponse({ status: 200, type: PageableTripResponseDto })
  findAllPaginated(@Query() query: PaginatedQueryTripDto) {
    return this.tripService.findAllWithPagination(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get trip by ID' })
  @ApiResponse({ status: 200, type: TripResponseDto })
  findOne(@Param('id') id: string) {
    return this.tripService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update trip' })
  @ApiResponse({ status: 200, type: TripResponseDto })
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(+id, updateTripDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete trip' })
  remove(@Param('id') id: string) {
    return this.tripService.remove(+id);
  }
}
