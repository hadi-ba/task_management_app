import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ApiResponse } from '@nestjs/swagger';
import { MessageResponseDto } from 'src/shared/dtos/message-response.dto';
import { FindAllColumnsResponseDto } from './dto/find-all-columns-response.dto';
import { FindOneColumnResponseDto } from './dto/find-one-column-response.dto';

@Controller('column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @ApiResponse({ type: MessageResponseDto })
  @Post()
  create(@Body() createColumnDto: CreateColumnDto) {
    return this.columnService.create(createColumnDto);
  }

  @ApiResponse({ type: FindAllColumnsResponseDto, isArray: true })
  @Get()
  findAll(@Param('boardId') boardId: string) {
    return this.columnService.findAll(+boardId);
  }

  @ApiResponse({ type: FindOneColumnResponseDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.columnService.findOne(+id);
  }

  @ApiResponse({ type: MessageResponseDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnService.update(+id, updateColumnDto);
  }

  @ApiResponse({ type: MessageResponseDto })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.columnService.remove(+id);
  }
}
