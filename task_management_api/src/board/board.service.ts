import { Injectable } from '@nestjs/common';
import { MessageResponseDto } from 'src/shared/dtos/message-response.dto';
import { DatabaseService } from '../database/database.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { FindAllBoardsResponseDto } from './dto/find-all-boards-response.dto';
import { FindOneBoardResponseDto } from './dto/find-one-board-response.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createBoardDto: CreateBoardDto): Promise<MessageResponseDto> {
    await this.databaseService.board.create({
      data: {
        name: createBoardDto.name,
        columns: {
          createMany: {
            data: createBoardDto.columns.map((columnName) => ({
              name: columnName,
            })),
          },
        },
      },
      include: { columns: true },
    });

    return { message: 'Created Successfully' };
  }

  async findAll(): Promise<FindAllBoardsResponseDto[]> {
    return this.databaseService.board.findMany({});
  }

  async findOne(id: number): Promise<FindOneBoardResponseDto> {
    return await this.databaseService.board.findUniqueOrThrow({
      where: { id },
      include: {
        columns: { include: { tasks: { include: { subTasks: true } } } },
      },
    });
  }

  async update(
    id: number,
    updateBoardDto: UpdateBoardDto,
  ): Promise<MessageResponseDto> {
    const { name, columns = [] } = updateBoardDto;

    const existingColumns = await this.databaseService.column.findMany({
      where: { boardId: id },
      select: { id: true, name: true },
    });

    const existingNames = new Set(existingColumns.map((col) => col.name));
    const incomingNames = new Set(columns);

    const columnsToAdd = columns.filter((col) => !existingNames.has(col));
    const columnsToDelete = existingColumns
      .filter((col) => !incomingNames.has(col.name))
      .map((col) => col.id);

    await this.databaseService.$transaction(async (tx) => {
      if (name) {
        await tx.board.update({
          where: { id },
          data: { name },
        });
      }

      if (columnsToDelete.length > 0) {
        await tx.column.deleteMany({
          where: { id: { in: columnsToDelete } },
        });
      }

      if (columnsToAdd.length > 0) {
        await tx.column.createMany({
          data: columnsToAdd.map((name) => ({
            name,
            boardId: id,
          })),
        });
      }
    });

    return { message: 'Updated Successfully' };
  }

  async remove(id: number): Promise<MessageResponseDto> {
    await this.databaseService.board.delete({
      where: { id },
    });

    return { message: 'Deleted Successfully' };
  }
}
