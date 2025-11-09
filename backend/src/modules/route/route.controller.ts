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
import { CreateRouteDto } from './dto/create-route.dto';
import { PageableRouteResponseDto } from './dto/pageable-route-response.dto';
import { PaginatedQueryRouteDto } from './dto/paginated-query-route.dto';
import { QueryRouteDto } from './dto/query-route.dto';
import { RouteResponseDto } from './dto/route-response.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { RouteService } from './route.service';

@ApiTags('route')
@ApiBearerAuth()
@Controller('route')
@Roles(UserRole.admin)
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Post()
  @ApiOperation({ summary: 'Create route' })
  @ApiResponse({ status: 201, type: RouteResponseDto })
  create(@Body() createRouteDto: CreateRouteDto) {
    return this.routeService.create(createRouteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all routes (non-paginated)' })
  @ApiResponse({ status: 200, type: [RouteResponseDto] })
  findAll(@Query() query: QueryRouteDto) {
    return this.routeService.findAll(query);
  }

  @Get('paginated')
  @ApiOperation({ summary: 'Get all routes (paginated)' })
  @ApiResponse({ status: 200, type: PageableRouteResponseDto })
  findAllPaginated(@Query() query: PaginatedQueryRouteDto) {
    return this.routeService.findAllWithPagination(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get route by ID' })
  @ApiResponse({ status: 200, type: RouteResponseDto })
  findOne(@Param('id') id: string) {
    return this.routeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update route' })
  @ApiResponse({ status: 200, type: RouteResponseDto })
  update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
    return this.routeService.update(+id, updateRouteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete route' })
  remove(@Param('id') id: string) {
    return this.routeService.remove(+id);
  }
}
