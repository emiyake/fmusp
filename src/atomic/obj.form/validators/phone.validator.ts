import type { ValidatorReturnType } from '@atomic/obj.form/form.model';
import { validatePhoneNumber } from '@utils/phone-number.utils';
import type { FieldValues } from 'react-hook-form';
import { strings } from './validators.strings';

const defaultMessage = strings.phone;

export const PhoneValidator = <T extends FieldValues>(message: string = defaultMessage): ValidatorReturnType<T> => {
  return {
    validate: phone => validatePhoneNumber(phone) || message,
  };
};
