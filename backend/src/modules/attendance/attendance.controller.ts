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
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { QueryAttendanceDto } from './dto/query-attendance.dto';
import { PaginatedQueryAttendanceDto } from './dto/paginated-query-attendance.dto';
import { AttendanceResponseDto } from './dto/attendance-response.dto';
import { Roles } from '../../core/decorators/roles.decorator';
import { UserRoleEnum } from 'src/core/enums/user-role.enum';
import { PageableAttendanceResponseDto } from './dto/pageable-attendance-response.dto';

@ApiTags('attendance')
@ApiBearerAuth()
@Controller('attendance')
@Roles(UserRoleEnum.admin)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @ApiOperation({ summary: 'Create attendance' })
  @ApiResponse({ status: 201, type: AttendanceResponseDto })
  create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.create(createAttendanceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all attendances (non-paginated)' })
  @ApiResponse({ status: 200, type: [AttendanceResponseDto] })
  findAll(@Query() query: QueryAttendanceDto) {
    return this.attendanceService.findAll(query);
  }

  @Get('paginated')
  @ApiOperation({ summary: 'Get all attendances (paginated)' })
  @ApiResponse({ status: 200, type: PageableAttendanceResponseDto })
  findAllPaginated(@Query() query: PaginatedQueryAttendanceDto) {
    return this.attendanceService.findAllWithPagination(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get attendance by ID' })
  @ApiResponse({ status: 200, type: AttendanceResponseDto })
  findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update attendance' })
  @ApiResponse({ status: 200, type: AttendanceResponseDto })
  update(@Param('id') id: string, @Body() updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendanceService.update(+id, updateAttendanceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete attendance' })
  remove(@Param('id') id: string) {
    return this.attendanceService.remove(+id);
  }
}
