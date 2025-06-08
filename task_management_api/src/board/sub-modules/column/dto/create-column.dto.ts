import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { IsRecordExists } from 'src/shared/decorators/record-exists.decorator';

export class CreateColumnDto {
  @ApiProperty({
    description: 'The name of the column',
    example: 'To DO',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'ID of the board this column belongs to',
    example: 1,
    type: Number,
  })
  @IsInt()
  @IsRecordExists('board', 'id')
  boardId: number;
}
