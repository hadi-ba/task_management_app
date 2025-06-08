import { ApiProperty } from '@nestjs/swagger';

export class SubTask {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: Boolean })
  completed: boolean;

  @ApiProperty({ type: Number })
  taskId: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
