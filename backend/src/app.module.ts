import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtAuthGuard } from './core/guards/jwt-auth.guard';
import { RolesGuard } from './core/guards/roles.guard';
import { PrismaModule } from './core/prisma/prisma.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { BusModule } from './modules/bus/bus.module';
import { DriverModule } from './modules/driver/driver.module';
import { ParentStudentModule } from './modules/parent-student/parent-student.module';
import { ParentModule } from './modules/parent/parent.module';
import { RouteModule } from './modules/route/route.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { StopPointModule } from './modules/stop-point/stop-point.module';
import { StudentScheduleModule } from './modules/student-schedule/student-schedule.module';
import { StudentModule } from './modules/student/student.module';
import { UsersModule } from './modules/users/users.module';
import { ItineraryModule } from './modules/itinerary/itinerary.module';
import { TripModule } from './modules/trip/trip.module';
import { LocationEventModule } from './modules/location-event/location-event.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { NotificationModule } from './modules/notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        // @ts-ignore
        expiresIn: (process.env.JWT_EXPIRATION as string) || '1d',
      },
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    AdminModule,
    DriverModule,
    ParentModule,
    StudentModule,
    ParentStudentModule,
    BusModule,
    RouteModule,
    StopPointModule,
    ItineraryModule,
    ScheduleModule,
    StudentScheduleModule,
    TripModule,
    LocationEventModule,
    AttendanceModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
