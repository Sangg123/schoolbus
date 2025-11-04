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
import { AdminService } from './admin.service';
import { AdminResponseDto } from './dto/admin-response.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { PageableAdminResponseDto } from './dto/pageable-admin-response.dto';
import { PaginatedQueryAdminDto } from './dto/paginated-query-admin.dto';
import { QueryAdminDto } from './dto/query-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@ApiTags('admin')
@ApiBearerAuth()
@Controller('admin')
@Roles(UserRole.admin) // Example of admin-only route
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({ summary: 'Create admin' })
  @ApiResponse({ status: 201, type: AdminResponseDto })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all admins (non-paginated)' })
  @ApiResponse({ status: 200, type: [AdminResponseDto] })
  findAll(@Query() query: QueryAdminDto) {
    return this.adminService.findAll(query);
  }

  @Get('paginated')
  @ApiOperation({ summary: 'Get all admins (paginated)' })
  @ApiResponse({ status: 200, type: PageableAdminResponseDto })
  findAllPaginated(@Query() query: PaginatedQueryAdminDto) {
    return this.adminService.findAllWithPagination(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get admin by ID' })
  @ApiResponse({ status: 200, type: AdminResponseDto })
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update admin' })
  @ApiResponse({ status: 200, type: AdminResponseDto })
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete admin' })
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
