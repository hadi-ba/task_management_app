import { IntersectionType, PickType } from '@nestjs/swagger';
import { Column } from 'src/_gen/prisma-class/column';
import { ColumnRelations } from 'src/_gen/prisma-class/column_relations';

export class FindAllColumnsResponseDto extends IntersectionType(
  Column,
  PickType(ColumnRelations, ['tasks'] as const),
) {}
