import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { MessageResponseDto } from 'src/shared/dtos/message-response.dto';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { FindAllBoardsResponseDto } from './dto/find-all-boards-response.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { FindOneBoardResponseDto } from './dto/find-one-board-response.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @ApiResponse({ type: MessageResponseDto })
  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @ApiResponse({ type: FindAllBoardsResponseDto, isArray: true })
  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @ApiResponse({ type: FindOneBoardResponseDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardService.findOne(+id);
  }

  @ApiResponse({ type: MessageResponseDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(+id, updateBoardDto);
  }

  @ApiResponse({ type: MessageResponseDto })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(+id);
  }
}
