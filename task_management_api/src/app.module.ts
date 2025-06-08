import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import { DatabaseModule } from './database/database.module';
import { RecordExistsConstraint } from './shared/validation/record-exists.constraint';
import { UniqueStringsArrayConstraint } from './shared/validation/unique-strings-array.constraint';

@Module({
  imports: [DatabaseModule, BoardModule],
  providers: [RecordExistsConstraint, UniqueStringsArrayConstraint],
})
export class AppModule {}
