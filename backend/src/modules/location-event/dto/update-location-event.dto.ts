import { PartialType } from '@nestjs/swagger';
import { CreateLocationEventDto } from './create-location-event.dto';

export class UpdateLocationEventDto extends PartialType(
  CreateLocationEventDto,
) {}
