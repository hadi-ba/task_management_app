import { Controller, Param, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { MessageResponseDto } from 'src/shared/dtos/message-response.dto';
import { SubTaskService } from './sub-task.service';

@Controller('sub-task')
export class SubTaskController {
  constructor(private readonly subTaskService: SubTaskService) {}

  @ApiResponse({ type: MessageResponseDto })
  @Post('toggle/:id')
  create(@Param('id') id: string) {
    return this.subTaskService.toggleSubtaskStatus(+id);
  }
}
