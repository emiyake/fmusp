import type { ValidatorReturnType } from '@atomic/obj.form/form.model';
import type { FieldValues } from 'react-hook-form';

export const LetterOnlyValidator = <T extends FieldValues>(
  acceptSpace: boolean,
  message: string,
): ValidatorReturnType<T> => {
  return {
    validate: (value: string) =>
      value?.match(acceptSpace ? /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s]*$/ : /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]*$/) ||
      message,
  };
};
