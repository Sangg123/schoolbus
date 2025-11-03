import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { DriverRepository } from './driver.repository';

@Module({
  controllers: [DriverController],
  providers: [DriverService, DriverRepository],
  exports: [DriverService],
})
export class DriverModule {}
