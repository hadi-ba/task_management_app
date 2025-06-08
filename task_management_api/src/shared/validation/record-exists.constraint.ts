import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { DatabaseService } from '../../database/database.service';

@Injectable()
@ValidatorConstraint({ name: 'RecordExists', async: true })
export class RecordExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly databaseService: DatabaseService) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [entity, column] = args.constraints;

    if (!(entity in this.databaseService)) {
      throw new Error(
        `Invalid entity '${entity}' provided to RecordExists decorator`,
      );
    }

    const record = await (this.databaseService[entity] as any).findFirst({
      where: { [column]: value },
    });

    return !!record;
  }

  defaultMessage(args: ValidationArguments): string {
    const [entity, column] = args.constraints;
    const message =
      args.object['customMessages']?.[args.property]?.recordExists;
    return message || `${entity} with this ${column} does not exist`;
  }
}
