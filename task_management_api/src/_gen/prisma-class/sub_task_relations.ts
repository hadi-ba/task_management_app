import { Task } from './task';
import { ApiProperty } from '@nestjs/swagger';

export class SubTaskRelations {
  @ApiProperty({ type: () => Task })
  task: Task;
}
