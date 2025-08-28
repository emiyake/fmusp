import type { ValidatorReturnType } from '@atomic/obj.form/form.model';
import type { FieldValues } from 'react-hook-form';
import { strings } from './validators.strings';

const defaultMessage = strings.hasAtLeastOneSubstring;

export const HasAtLeastOnePatternValidator = <T extends FieldValues>(
  patterns: RegExp[],
  message: string = defaultMessage,
): ValidatorReturnType<T> => {
  return {
    validate: (value: string) => {
      return patterns.map(item => !!value.match(item)).some(Boolean) || message;
    },
  };
};
