import type { ValidatorReturnType } from '@atomic/obj.form/form.model';
import type { FieldValues } from 'react-hook-form';
import { strings } from './validators.strings';

const defaultMessage = strings.mustBeEqual;

export const MustBeEqualValidator = <T extends FieldValues>(
  value: string,
  message: string = defaultMessage,
): ValidatorReturnType<T> => {
  return {
    validate: formValue => formValue === value || message,
  };
};
