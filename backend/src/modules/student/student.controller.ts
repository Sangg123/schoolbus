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
import { CreateStudentDto } from './dto/create-student.dto';
import { PageableStudentResponseDto } from './dto/pageable-student-response.dto';
import { PaginatedQueryStudentDto } from './dto/paginated-query-student.dto';
import { QueryStudentDto } from './dto/query-student.dto';
import { StudentResponseDto } from './dto/student-response.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentService } from './student.service';

@ApiTags('student')
@ApiBearerAuth()
@Controller('student')
@Roles(UserRole.admin)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @ApiOperation({ summary: 'Create student' })
  @ApiResponse({ status: 201, type: StudentResponseDto })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all students (non-paginated)' })
  @ApiResponse({ status: 200, type: [StudentResponseDto] })
  findAll(@Query() query: QueryStudentDto) {
    return this.studentService.findAll(query);
  }

  @Get('paginated')
  @ApiOperation({ summary: 'Get all students (paginated)' })
  @ApiResponse({ status: 200, type: PageableStudentResponseDto })
  findAllPaginated(@Query() query: PaginatedQueryStudentDto) {
    return this.studentService.findAllWithPagination(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get student by ID' })
  @ApiResponse({ status: 200, type: StudentResponseDto })
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update student' })
  @ApiResponse({ status: 200, type: StudentResponseDto })
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete student' })
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
