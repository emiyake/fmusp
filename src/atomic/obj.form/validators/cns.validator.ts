import type { ValidatorReturnType } from '@atomic/obj.form/form.model';
import { isCnsValid } from '@atomic/obj.form/regex-validator';
import type { FieldValues } from 'react-hook-form';

export const CnsValidator = <T extends FieldValues>(message: string): ValidatorReturnType<T> => {
  return {
    validate: (value: string) => !value || isCnsValid(value) || message,
  };
};
