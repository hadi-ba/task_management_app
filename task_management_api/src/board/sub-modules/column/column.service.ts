import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MessageResponseDto } from 'src/shared/dtos/message-response.dto';
import { CreateColumnDto } from './dto/create-column.dto';
import { FindAllColumnsResponseDto } from './dto/find-all-columns-response.dto';
import { FindOneColumnResponseDto } from './dto/find-one-column-response.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnService {
  constructor(private readonly dataBaseService: DatabaseService) {}

  async create(createColumnDto: CreateColumnDto): Promise<MessageResponseDto> {
    await this.dataBaseService.column.create({
      data: { name: createColumnDto.name, boardId: createColumnDto.boardId },
    });

    return { message: 'Created Successfully' };
  }

  async findAll(boardId: number): Promise<FindAllColumnsResponseDto[]> {
    return this.dataBaseService.column.findMany({
      where: { boardId },
      include: { tasks: true },
    });
  }

  async findOne(id: number): Promise<FindOneColumnResponseDto> {
    return await this.dataBaseService.column.findUniqueOrThrow({
      where: { id },
      include: { tasks: true },
    });
  }

  async update(
    id: number,
    updateColumnDto: UpdateColumnDto,
  ): Promise<MessageResponseDto> {
    await this.dataBaseService.column.update({
      where: { id },
      data: { name: updateColumnDto.name },
    });

    return { message: 'Updated Successfully' };
  }

  async remove(id: number): Promise<MessageResponseDto> {
    await this.dataBaseService.column.delete({ where: { id } });

    return { message: 'Deleted Successfully' };
  }
}
