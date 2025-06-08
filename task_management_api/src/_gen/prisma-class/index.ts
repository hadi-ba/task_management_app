import { BoardRelations as _BoardRelations } from './board_relations';
import { ColumnRelations as _ColumnRelations } from './column_relations';
import { TaskRelations as _TaskRelations } from './task_relations';
import { SubTaskRelations as _SubTaskRelations } from './sub_task_relations';
import { Board as _Board } from './board';
import { Column as _Column } from './column';
import { Task as _Task } from './task';
import { SubTask as _SubTask } from './sub_task';

export namespace PrismaModel {
  export class BoardRelations extends _BoardRelations {}
  export class ColumnRelations extends _ColumnRelations {}
  export class TaskRelations extends _TaskRelations {}
  export class SubTaskRelations extends _SubTaskRelations {}
  export class Board extends _Board {}
  export class Column extends _Column {}
  export class Task extends _Task {}
  export class SubTask extends _SubTask {}

  export const extraModels = [
    BoardRelations,
    ColumnRelations,
    TaskRelations,
    SubTaskRelations,
    Board,
    Column,
    Task,
    SubTask,
  ];
}
