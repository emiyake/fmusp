import type { ValidatorReturnType } from '@atomic/obj.form/form.model';
import type { FieldValues } from 'react-hook-form';
import { strings } from './validators.strings';

export const MaxLengthValidator = <T extends FieldValues>(value: number, message?: string): ValidatorReturnType<T> => {
  const finalMessage = message ?? strings.maxLength(value);

  return {
    maxLength: {
      value,
      message: finalMessage,
    },
  };
};
