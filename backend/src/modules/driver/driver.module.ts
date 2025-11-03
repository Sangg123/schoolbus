import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverRepository } from './driver.repository';
import { DriverService } from './driver.service';

@Module({
  controllers: [DriverController],
  providers: [DriverService, DriverRepository],
  exports: [DriverService],
})
export class DriverModule {}
