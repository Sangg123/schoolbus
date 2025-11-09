import { Module } from '@nestjs/common';
import { RouteController } from './route.controller';
import { RouteRepository } from './route.repository';
import { RouteService } from './route.service';

@Module({
  controllers: [RouteController],
  providers: [RouteService, RouteRepository],
  exports: [RouteService],
})
export class RouteModule {}
