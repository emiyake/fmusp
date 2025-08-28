import type { ValidatorReturnType } from '@atomic/obj.form/form.model';
import type { FieldValues } from 'react-hook-form';
import { strings } from './validators.strings';

const defaultMessage = strings.zipcode;
export const ZIPCODE_LENGTH = 8;

export const ZipCodeValidator = <T extends FieldValues>(message: string = defaultMessage): ValidatorReturnType<T> => {
  return {
    maxLength: {
      value: ZIPCODE_LENGTH,
      message,
    },
    minLength: {
      value: ZIPCODE_LENGTH,
      message,
    },
  };
};
