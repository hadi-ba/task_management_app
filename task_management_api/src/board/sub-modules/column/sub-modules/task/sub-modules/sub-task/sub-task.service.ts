import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MessageResponseDto } from 'src/shared/dtos/message-response.dto';

@Injectable()
export class SubTaskService {
  constructor(private readonly databaseService: DatabaseService) {}

  async toggleSubtaskStatus(subTaskId: number): Promise<MessageResponseDto> {
    const subTask = await this.databaseService.subTask.findUnique({
      where: { id: subTaskId },
    });

    await this.databaseService.subTask.update({
      where: { id: subTaskId },
      data: { completed: !Boolean(subTask?.completed) },
    });

    return { message: 'Updated Successfully' };
  }
}
