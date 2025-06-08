import { registerDecorator, ValidationOptions } from 'class-validator';
import { UniqueStringsArrayConstraint } from 'src/shared/validation/unique-strings-array.constraint';

export function UniqueStringsArray(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueStringsArrayConstraint,
    });
  };
}
