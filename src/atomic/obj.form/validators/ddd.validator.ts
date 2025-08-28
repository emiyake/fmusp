import type { ValidatorReturnType } from '@atomic/obj.form/form.model';
import { isDDDValid } from '@atomic/obj.form/regex-validator';
import type { FieldValues } from 'react-hook-form';

export const DDDValidator = <T extends FieldValues>(message: string): ValidatorReturnType<T> => {
  return {
    validate: (value: string) => isDDDValid(value) || message,
  };
};
