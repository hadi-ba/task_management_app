import { PickType } from '@nestjs/swagger';
import { CreateColumnDto } from './create-column.dto';

export class UpdateColumnDto extends PickType(CreateColumnDto, [
  'name',
] as const) {}
