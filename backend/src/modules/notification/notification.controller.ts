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
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { QueryNotificationDto } from './dto/query-notification.dto';
import { PaginatedQueryNotificationDto } from './dto/paginated-query-notification.dto';
import { NotificationResponseDto } from './dto/notification-response.dto';
import { Roles } from '../../core/decorators/roles.decorator';
import { UserRoleEnum } from 'src/core/enums/user-role.enum';
import { PageableNotificationResponseDto } from './dto/pageable-notification-response.dto';

@ApiTags('notification')
@ApiBearerAuth()
@Controller('notification')
@Roles(UserRoleEnum.admin)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @ApiOperation({ summary: 'Create notification' })
  @ApiResponse({ status: 201, type: NotificationResponseDto })
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notifications (non-paginated)' })
  @ApiResponse({ status: 200, type: [NotificationResponseDto] })
  findAll(@Query() query: QueryNotificationDto) {
    return this.notificationService.findAll(query);
  }

  @Get('paginated')
  @ApiOperation({ summary: 'Get all notifications (paginated)' })
  @ApiResponse({ status: 200, type: PageableNotificationResponseDto })
  findAllPaginated(@Query() query: PaginatedQueryNotificationDto) {
    return this.notificationService.findAllWithPagination(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get notification by ID' })
  @ApiResponse({ status: 200, type: NotificationResponseDto })
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update notification' })
  @ApiResponse({ status: 200, type: NotificationResponseDto })
  update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationService.update(+id, updateNotificationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete notification' })
  remove(@Param('id') id: string) {
    return this.notificationService.remove(+id);
  }
}
