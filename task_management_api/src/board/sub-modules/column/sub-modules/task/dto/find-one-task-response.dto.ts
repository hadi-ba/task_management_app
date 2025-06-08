import { IntersectionType, PickType } from '@nestjs/swagger';
import { Task } from 'src/_gen/prisma-class/task';
import { TaskRelations } from 'src/_gen/prisma-class/task_relations';

export class FindOneTaskResponseDto extends IntersectionType(
  Task,
  PickType(TaskRelations, ['subTasks'] as const),
) {}
