import type { ValidatorReturnType } from '@atomic/obj.form/form.model';
import type { FieldValues } from 'react-hook-form';
import * as z from 'zod';
import { strings } from './validators.strings';
import { ZodValidator } from './zod.validator';

const defaultMessage = strings.number;

export const NumberStringValidator = <T extends FieldValues>(
  message: string = defaultMessage,
): ValidatorReturnType<T> => {
  const numberSchema = z.coerce.number({ message });

  return ZodValidator(numberSchema);
};
