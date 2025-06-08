import { registerDecorator, ValidationOptions } from 'class-validator';
import { RecordExistsConstraint } from 'src/shared/validation/record-exists.constraint';

export function IsRecordExists(
  entity: string,
  column: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isRecordExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity, column],
      validator: RecordExistsConstraint,
    });
  };
}
