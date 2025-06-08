import { Board } from './board';
import { Task } from './task';
import { ApiProperty } from '@nestjs/swagger';

export class ColumnRelations {
  @ApiProperty({ type: () => Board })
  board: Board;

  @ApiProperty({ isArray: true, type: () => Task })
  tasks: Task[];
}
