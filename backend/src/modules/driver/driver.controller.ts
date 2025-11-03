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
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { DriverResponseDto } from './dto/driver-response.dto';
import { PageableDriverResponseDto } from './dto/pageable-driver-response.dto';
import { PaginatedQueryDriverDto } from './dto/paginated-query-driver.dto';
import { QueryDriverDto } from './dto/query-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@ApiTags('driver')
@ApiBearerAuth()
@Controller('driver')
@Roles(UserRole.admin)
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  @ApiOperation({ summary: 'Create driver' })
  @ApiResponse({ status: 201, type: DriverResponseDto })
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driverService.create(createDriverDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all drivers (non-paginated)' })
  @ApiResponse({ status: 200, type: [DriverResponseDto] })
  findAll(@Query() query: QueryDriverDto) {
    return this.driverService.findAll(query);
  }

  @Get('paginated')
  @ApiOperation({ summary: 'Get all drivers (paginated)' })
  @ApiResponse({ status: 200, type: PageableDriverResponseDto })
  findAllPaginated(@Query() query: PaginatedQueryDriverDto) {
    return this.driverService.findAllWithPagination(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get driver by ID' })
  @ApiResponse({ status: 200, type: DriverResponseDto })
  findOne(@Param('id') id: string) {
    return this.driverService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update driver' })
  @ApiResponse({ status: 200, type: DriverResponseDto })
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driverService.update(+id, updateDriverDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete driver' })
  remove(@Param('id') id: string) {
    return this.driverService.remove(+id);
  }
}
