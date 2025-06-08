import type { ITask } from "./ITask";

export interface IColumn {
  id: number;
  name: string;
  boardId: number;
  createdAt: string;
  updatedAt: string;
  tasks: ITask[];
}
