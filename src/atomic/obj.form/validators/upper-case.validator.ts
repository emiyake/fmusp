import type { ValidatorReturnType } from '@atomic/obj.form/form.model';
import type { FieldValues } from 'react-hook-form';
import { strings } from './validators.strings';

const defaultMessage = strings.upperCase;

export const UpperCaseValidator = <T extends FieldValues>(message: string = defaultMessage): ValidatorReturnType<T> => {
  return {
    validate: (value: string) => value === value.toUpperCase() || message,
  };
};
