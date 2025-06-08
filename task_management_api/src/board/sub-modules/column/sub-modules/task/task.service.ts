import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DatabaseService } from 'src/database/database.service';
import { MessageResponseDto } from 'src/shared/dtos/message-response.dto';
import { FindAllTasksResponseDto } from './dto/find-all-tasks-response.dto';
import { FindOneTaskResponseDto } from './dto/find-one-task-response.dto';

@Injectable()
export class TaskService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTaskDto: CreateTaskDto): Promise<MessageResponseDto> {
    await this.databaseService.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        columnId: createTaskDto.columnId,
        subTasks: {
          createMany: {
            data: createTaskDto.subTasks.map((subTaskName) => ({
              title: subTaskName,
            })),
          },
        },
      },
    });

    return { message: 'Created Successfully' };
  }

  async findAll(columnId: number): Promise<FindAllTasksResponseDto[]> {
    return this.databaseService.task.findMany({ where: { columnId } });
  }

  async findOne(id: number): Promise<FindOneTaskResponseDto> {
    return this.databaseService.task.findUniqueOrThrow({
      where: { id },
      include: { subTasks: true },
    });
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<MessageResponseDto> {
    const { title, description, columnId, subTasks } = updateTaskDto;

    await this.databaseService.$transaction(async (tx) => {
      if (title || description || columnId) {
        await tx.task.update({
          where: { id },
          data: {
            ...(title && { title }),
            ...(description && { description }),
            ...(columnId && { columnId }),
          },
        });
      }

      if (subTasks !== undefined) {
        const existingSubTasks = await tx.subTask.findMany({
          where: { taskId: id },
          select: { id: true, title: true },
        });

        const existingNames = new Set(existingSubTasks.map((s) => s.title));
        const incomingNames = new Set(subTasks);

        const toAdd = subTasks.filter((name) => !existingNames.has(name));
        const toDelete = existingSubTasks
          .filter((s) => !incomingNames.has(s.title))
          .map((s) => s.id);

        if (toDelete.length) {
          await tx.subTask.deleteMany({
            where: { id: { in: toDelete } },
          });
        }

        if (toAdd.length) {
          await tx.subTask.createMany({
            data: toAdd.map((title) => ({
              title,
              taskId: id,
            })),
          });
        }
      }
    });

    return { message: 'Updated Successfully' };
  }

  async updateTaskStatus(
    taskId: number,
    columnId: number,
  ): Promise<MessageResponseDto> {
    await this.databaseService.task.update({
      where: { id: taskId },
      data: { columnId },
      include: { subTasks: true },
    });

    return { message: 'Updated Successfully' };
  }

  async remove(id: number): Promise<MessageResponseDto> {
    await this.databaseService.task.delete({ where: { id } });

    return { message: 'Deleted Successfully' };
  }
}
