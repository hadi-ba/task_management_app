import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { ColumnModule } from './sub-modules/column/column.module';

@Module({
  imports: [ColumnModule],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
