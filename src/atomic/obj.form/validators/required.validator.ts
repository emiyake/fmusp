import type { ValidatorReturnType } from '@atomic/obj.form/form.model';
import type { FieldValues } from 'react-hook-form';
import { strings } from './validators.strings';

const defaultMessage = strings.required;

export const RequiredValidator = <T extends FieldValues>(message: string = defaultMessage): ValidatorReturnType<T> => {
  return {
    required: message,
  };
};
