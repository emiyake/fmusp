import type { ValidatorReturnType } from '@atomic/obj.form/form.model';
import type { FieldValues } from 'react-hook-form';
import { strings } from './validators.strings';

const defaultMessage = strings.hasUpperCase;

export const HasUppercaseCharacterValidator = <T extends FieldValues>(
  message: string = defaultMessage,
): ValidatorReturnType<T> => {
  return {
    validate: (value: string) => !!value?.match(/[A-Z]/g) || message,
  };
};
