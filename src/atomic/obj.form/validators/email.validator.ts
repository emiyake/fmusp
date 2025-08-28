import type { ValidatorReturnType } from '@atomic/obj.form/form.model';
import type { FieldValues } from 'react-hook-form';
import * as z from 'zod';
import { strings } from './validators.strings';
import { ZodValidator } from './zod.validator';

const defaultMessage = strings.email;

export const EmailValidator = <T extends FieldValues>(message: string = defaultMessage): ValidatorReturnType<T> => {
  return ZodValidator(z.string().email({ message }));
};
