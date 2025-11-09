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
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { QueryScheduleDto } from './dto/query-schedule.dto';
import { PaginatedQueryScheduleDto } from './dto/paginated-query-schedule.dto';
import { ScheduleResponseDto } from './dto/schedule-response.dto';
import { Roles } from '../../core/decorators/roles.decorator';
import { UserRoleEnum } from 'src/core/enums/user-role.enum';
import { PageableScheduleResponseDto } from './dto/pageable-schedule-response.dto';

@ApiTags('schedule')
@ApiBearerAuth()
@Controller('schedule')
@Roles(UserRoleEnum.admin)
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  @ApiOperation({ summary: 'Create schedule' })
  @ApiResponse({ status: 201, type: ScheduleResponseDto })
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(createScheduleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all schedules (non-paginated)' })
  @ApiResponse({ status: 200, type: [ScheduleResponseDto] })
  findAll(@Query() query: QueryScheduleDto) {
    return this.scheduleService.findAll(query);
  }

  @Get('paginated')
  @ApiOperation({ summary: 'Get all schedules (paginated)' })
  @ApiResponse({ status: 200, type: PageableScheduleResponseDto })
  findAllPaginated(@Query() query: PaginatedQueryScheduleDto) {
    return this.scheduleService.findAllWithPagination(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get schedule by ID' })
  @ApiResponse({ status: 200, type: ScheduleResponseDto })
  findOne(@Param('id') id: string) {
    return this.scheduleService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update schedule' })
  @ApiResponse({ status: 200, type: ScheduleResponseDto })
  update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto) {
    return this.scheduleService.update(+id, updateScheduleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete schedule' })
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(+id);
  }
}
