import type { ISubTask } from "./ISubTask";

export interface ITask {
  id: number;
  title: string;
  description: string;
  columnId: number;
  subTasks?: ISubTask[];
  createdAt: string;
  updatedAt: string;
}
