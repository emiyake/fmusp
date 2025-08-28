import type { ValidateFunctionType, ValidatorReturnType } from '@atomic/obj.form/form.model';
import type { FieldValues } from 'react-hook-form';
import type { ZodSchema } from 'zod';
import { CustomValidator } from './custom.validator';

export const ZodValidator = <T extends FieldValues>(schema: ZodSchema): ValidatorReturnType<T> => {
  const validate: ValidateFunctionType<T> = value => {
    const result = schema.safeParse(value);
    return result.success || result.error?.errors[0].message;
  };
  return CustomValidator(validate);
};
