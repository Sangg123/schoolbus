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
import { ParentStudentService } from './parent-student.service';
import { CreateParentStudentDto } from './dto/create-parent-student.dto';
import { UpdateParentStudentDto } from './dto/update-parent-student.dto';
import { QueryParentStudentDto } from './dto/query-parent-student.dto';
import { PaginatedQueryParentStudentDto } from './dto/paginated-query-parent-student.dto';
import { ParentStudentResponseDto } from './dto/parent-student-response.dto';
import { Roles } from '../../core/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { PageableParentStudentResponseDto } from './dto/pageable-parent-student-response.dto';

@ApiTags('parent-student')
@ApiBearerAuth()
@Controller('parent-student')
@Roles(UserRole.admin)
export class ParentStudentController {
  constructor(private readonly parentStudentService: ParentStudentService) {}

  @Post()
  @ApiOperation({ summary: 'Create parent-student relation' })
  @ApiResponse({ status: 201, type: ParentStudentResponseDto })
  create(@Body() createParentStudentDto: CreateParentStudentDto) {
    return this.parentStudentService.create(createParentStudentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all parent-student relations (non-paginated)' })
  @ApiResponse({ status: 200, type: [ParentStudentResponseDto] })
  findAll(@Query() query: QueryParentStudentDto) {
    return this.parentStudentService.findAll(query);
  }

  @Get('paginated')
  @ApiOperation({ summary: 'Get all parent-student relations (paginated)' })
  @ApiResponse({ status: 200, type: PageableParentStudentResponseDto })
  findAllPaginated(@Query() query: PaginatedQueryParentStudentDto) {
    return this.parentStudentService.findAllWithPagination(query);
  }

  @Get(':parentId/:studentId')
  @ApiOperation({ summary: 'Get parent-student relation by IDs' })
  @ApiResponse({ status: 200, type: ParentStudentResponseDto })
  findOne(
    @Param('parentId') parentId: string,
    @Param('studentId') studentId: string,
  ) {
    return this.parentStudentService.findOne(+parentId, +studentId);
  }

  @Patch(':parentId/:studentId')
  @ApiOperation({ summary: 'Update parent-student relation' })
  @ApiResponse({ status: 200, type: ParentStudentResponseDto })
  update(
    @Param('parentId') parentId: string,
    @Param('studentId') studentId: string,
    @Body() updateParentStudentDto: UpdateParentStudentDto,
  ) {
    return this.parentStudentService.update(+parentId, +studentId, updateParentStudentDto);
  }

  @Delete(':parentId/:studentId')
  @ApiOperation({ summary: 'Delete parent-student relation' })
  remove(
    @Param('parentId') parentId: string,
    @Param('studentId') studentId: string,
  ) {
    return this.parentStudentService.remove(+parentId, +studentId);
  }
}
