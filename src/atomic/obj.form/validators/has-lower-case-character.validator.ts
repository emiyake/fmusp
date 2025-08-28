import type { ValidatorReturnType } from '@atomic/obj.form/form.model';
import type { FieldValues } from 'react-hook-form';
import { strings } from './validators.strings';

const defaultMessage = strings.hasLowerCase;

export const HasLowercaseCharacterValidator = <T extends FieldValues>(
  message: string = defaultMessage,
): ValidatorReturnType<T> => {
  return {
    validate: (value: string) => !!value?.match(/[a-z]/g) || message,
  };
};
