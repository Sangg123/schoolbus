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
import { BusService } from './bus.service';
import { BusResponseDto } from './dto/bus-response.dto';
import { CreateBusDto } from './dto/create-bus.dto';
import { PageableBusResponseDto } from './dto/pageable-bus-response.dto';
import { PaginatedQueryBusDto } from './dto/paginated-query-bus.dto';
import { QueryBusDto } from './dto/query-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';

@ApiTags('bus')
@ApiBearerAuth()
@Controller('bus')
@Roles(UserRole.admin)
export class BusController {
  constructor(private readonly busService: BusService) {}

  @Post()
  @ApiOperation({ summary: 'Create bus' })
  @ApiResponse({ status: 201, type: BusResponseDto })
  create(@Body() createBusDto: CreateBusDto) {
    return this.busService.create(createBusDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all buses (non-paginated)' })
  @ApiResponse({ status: 200, type: [BusResponseDto] })
  findAll(@Query() query: QueryBusDto) {
    return this.busService.findAll(query);
  }

  @Get('paginated')
  @ApiOperation({ summary: 'Get all buses (paginated)' })
  @ApiResponse({ status: 200, type: PageableBusResponseDto })
  findAllPaginated(@Query() query: PaginatedQueryBusDto) {
    return this.busService.findAllWithPagination(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get bus by ID' })
  @ApiResponse({ status: 200, type: BusResponseDto })
  findOne(@Param('id') id: string) {
    return this.busService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update bus' })
  @ApiResponse({ status: 200, type: BusResponseDto })
  update(@Param('id') id: string, @Body() updateBusDto: UpdateBusDto) {
    return this.busService.update(+id, updateBusDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete bus' })
  remove(@Param('id') id: string) {
    return this.busService.remove(+id);
  }
}
