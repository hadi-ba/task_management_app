import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'UniqueStringsArray', async: false })
export class UniqueStringsArrayConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments): boolean {
    const uniqueItems = new Set(value);
    return uniqueItems.size === value.length;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be an array of unique strings`;
  }
}
