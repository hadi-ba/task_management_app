import { ApiProperty } from '@nestjs/swagger';
import { Board } from 'src/_gen/prisma-class/board';
import { FindOneColumnResponseDto } from '../sub-modules/column/dto/find-one-column-response.dto';

export class FindOneBoardResponseDto extends Board {
  @ApiProperty({ type: () => FindOneColumnResponseDto })
  columns: FindOneColumnResponseDto[];
}
