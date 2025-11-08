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
import { StudentScheduleService } from './student-schedule.service';
import { CreateStudentScheduleDto } from './dto/create-student-schedule.dto';
import { UpdateStudentScheduleDto } from './dto/update-student-schedule.dto';
import { QueryStudentScheduleDto } from './dto/query-student-schedule.dto';
import { PaginatedQueryStudentScheduleDto } from './dto/paginated-query-student-schedule.dto';
import { StudentScheduleResponseDto } from './dto/student-schedule-response.dto';
import { Roles } from '../../core/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { PageableStudentScheduleResponseDto } from './dto/pageable-student-schedule-response.dto';

@ApiTags('student-schedule')
@ApiBearerAuth()
@Controller('student-schedule')
@Roles(UserRole.admin)
export class StudentScheduleController {
  constructor(private readonly studentScheduleService: StudentScheduleService) {}

  @Post()
  @ApiOperation({ summary: 'Create student-schedule relation' })
  @ApiResponse({ status: 201, type: StudentScheduleResponseDto })
  create(@Body() createStudentScheduleDto: CreateStudentScheduleDto) {
    return this.studentScheduleService.create(createStudentScheduleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all student-schedule relations (non-paginated)' })
  @ApiResponse({ status: 200, type: [StudentScheduleResponseDto] })
  findAll(@Query() query: QueryStudentScheduleDto) {
    return this.studentScheduleService.findAll(query);
  }

  @Get('paginated')
  @ApiOperation({ summary: 'Get all student-schedule relations (paginated)' })
  @ApiResponse({ status: 200, type: PageableStudentScheduleResponseDto })
  findAllPaginated(@Query() query: PaginatedQueryStudentScheduleDto) {
    return this.studentScheduleService.findAllWithPagination(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get student-schedule relation by ID' })
  @ApiResponse({ status: 200, type: StudentScheduleResponseDto })
  findOne(@Param('id') id: string) {
    return this.studentScheduleService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update student-schedule relation' })
  @ApiResponse({ status: 200, type: StudentScheduleResponseDto })
  update(@Param('id') id: string, @Body() updateStudentScheduleDto: UpdateStudentScheduleDto) {
    return this.studentScheduleService.update(+id, updateStudentScheduleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete student-schedule relation' })
  remove(@Param('id') id: string) {
    return this.studentScheduleService.remove(+id);
  }
}
