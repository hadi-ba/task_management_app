import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { UniqueStringsArray } from 'src/shared/decorators/unique-strings-array.decorator';

export class CreateBoardDto {
  @ApiProperty({
    description: 'The name of the board',
    example: 'Marketing Plan',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'List of column names for the board',
    example: ['To Do', 'In Progress', 'Done'],
    type: [String],
  })
  @IsArray()
  @Type(() => String)
  @IsString({ each: true })
  @UniqueStringsArray()
  columns: string[];
}
