import { Column } from './column';
import { ApiProperty } from '@nestjs/swagger';

export class BoardRelations {
  @ApiProperty({ isArray: true, type: () => Column })
  columns: Column[];
}
