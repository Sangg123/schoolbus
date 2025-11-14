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
import { UserRoleEnum } from 'src/core/enums/user-role.enum';
import { Roles } from '../../core/decorators/roles.decorator';
import { CreateItineraryDto } from './dto/create-itinerary.dto';
import { ItineraryResponseDto } from './dto/itinerary-response.dto';
import { PageableItineraryResponseDto } from './dto/pageable-itinerary-response.dto';
import { PaginatedQueryItineraryDto } from './dto/paginated-query-itinerary.dto';
import { QueryItineraryDto } from './dto/query-itinerary.dto';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';
import { ItineraryService } from './itinerary.service';

@ApiTags('itinerary')
@ApiBearerAuth()
@Controller('itinerary')
@Roles(UserRoleEnum.admin)
export class ItineraryController {
  constructor(private readonly itineraryService: ItineraryService) {}

  @Post()
  @ApiOperation({ summary: 'Create itinerary' })
  @ApiResponse({ status: 201, type: ItineraryResponseDto })
  create(@Body() createItineraryDto: CreateItineraryDto) {
    return this.itineraryService.create(createItineraryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all itineraries (non-paginated)' })
  @ApiResponse({ status: 200, type: [ItineraryResponseDto] })
  findAll(@Query() query: QueryItineraryDto) {
    return this.itineraryService.findAll(query);
  }

  @Get('paginated')
  @ApiOperation({ summary: 'Get all itineraries (paginated)' })
  @ApiResponse({ status: 200, type: PageableItineraryResponseDto })
  findAllPaginated(@Query() query: PaginatedQueryItineraryDto) {
    return this.itineraryService.findAllWithPagination(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get itinerary by ID' })
  @ApiResponse({ status: 200, type: ItineraryResponseDto })
  findOne(@Param('id') id: string) {
    return this.itineraryService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update itinerary' })
  @ApiResponse({ status: 200, type: ItineraryResponseDto })
  update(
    @Param('id') id: string,
    @Body() updateItineraryDto: UpdateItineraryDto,
  ) {
    return this.itineraryService.update(+id, updateItineraryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete itinerary' })
  remove(@Param('id') id: string) {
    return this.itineraryService.remove(+id);
  }
}
