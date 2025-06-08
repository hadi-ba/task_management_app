import type { IColumn } from "./IColumn";

export interface IBoard {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  columns: IColumn[];
}
