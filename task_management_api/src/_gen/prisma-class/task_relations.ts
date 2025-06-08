import { Column } from './column';
import { SubTask } from './sub_task';
import { ApiProperty } from '@nestjs/swagger';

export class TaskRelations {
  @ApiProperty({ type: () => Column })
  column: Column;

  @ApiProperty({ isArray: true, type: () => SubTask })
  subTasks: SubTask[];
}
