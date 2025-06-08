import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { TaskModule } from './sub-modules/task/task.module';

@Module({
  imports: [TaskModule],
  controllers: [ColumnController],
  providers: [ColumnService],
})
export class ColumnModule {}
