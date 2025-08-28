import type { ValidatorReturnType } from '@atomic/obj.form/form.model';
import type { FieldValues } from 'react-hook-form';
import { strings } from './validators.strings';

export const MinLengthValidator = <T extends FieldValues>(value: number, message?: string): ValidatorReturnType<T> => {
  const finalMessage = message ?? strings.minLength(value);

  return {
    minLength: {
      value,
      message: finalMessage,
    },
  };
};
