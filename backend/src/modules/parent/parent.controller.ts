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
import { CreateParentDto } from './dto/create-parent.dto';
import { PageableParentResponseDto } from './dto/pageable-parent-response.dto';
import { PaginatedQueryParentDto } from './dto/paginated-query-parent.dto';
import { ParentResponseDto } from './dto/parent-response.dto';
import { QueryParentDto } from './dto/query-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { ParentService } from './parent.service';

@ApiTags('parent')
@ApiBearerAuth()
@Controller('parent')
@Roles(UserRole.admin)
export class ParentController {
  constructor(private readonly parentService: ParentService) {}

  @Post()
  @ApiOperation({ summary: 'Create parent' })
  @ApiResponse({ status: 201, type: ParentResponseDto })
  create(@Body() createParentDto: CreateParentDto) {
    return this.parentService.create(createParentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all parents (non-paginated)' })
  @ApiResponse({ status: 200, type: [ParentResponseDto] })
  findAll(@Query() query: QueryParentDto) {
    return this.parentService.findAll(query);
  }

  @Get('paginated')
  @ApiOperation({ summary: 'Get all parents (paginated)' })
  @ApiResponse({ status: 200, type: PageableParentResponseDto })
  findAllPaginated(@Query() query: PaginatedQueryParentDto) {
    return this.parentService.findAllWithPagination(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get parent by ID' })
  @ApiResponse({ status: 200, type: ParentResponseDto })
  findOne(@Param('id') id: string) {
    return this.parentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update parent' })
  @ApiResponse({ status: 200, type: ParentResponseDto })
  update(@Param('id') id: string, @Body() updateParentDto: UpdateParentDto) {
    return this.parentService.update(+id, updateParentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete parent' })
  remove(@Param('id') id: string) {
    return this.parentService.remove(+id);
  }
}
