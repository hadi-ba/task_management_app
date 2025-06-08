import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { SubTaskModule } from './sub-modules/sub-task/sub-task.module';

@Module({
  imports: [SubTaskModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
