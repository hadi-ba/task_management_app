import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiResponse } from '@nestjs/swagger';
import { MessageResponseDto } from 'src/shared/dtos/message-response.dto';
import { FindAllTasksResponseDto } from './dto/find-all-tasks-response.dto';
import { FindOneTaskResponseDto } from './dto/find-one-task-response.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiResponse({ type: MessageResponseDto })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @ApiResponse({ type: FindAllTasksResponseDto })
  @Get()
  findAll(@Param('columnId') columnId: string) {
    return this.taskService.findAll(+columnId);
  }

  @ApiResponse({ type: FindOneTaskResponseDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @ApiResponse({ type: MessageResponseDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @ApiResponse({ type: MessageResponseDto })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
