import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { IsRecordExists } from 'src/shared/decorators/record-exists.decorator';
import { UniqueStringsArray } from 'src/shared/decorators/unique-strings-array.decorator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Design homepage',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'Create a responsive homepage design with mobile support.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'List of subtask titles associated with the task',
    example: ['Wireframe layout', 'Add branding colors', 'Test responsiveness'],
    type: [String],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @UniqueStringsArray()
  subTasks: string[];

  @ApiProperty({
    description: 'ID of the column this task belongs to',
    example: 1,
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  @IsRecordExists('column', 'id')
  columnId: number;
}
