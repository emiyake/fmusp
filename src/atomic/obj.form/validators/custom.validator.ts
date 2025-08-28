import type { ValidateFunctionType, ValidatorReturnType } from '@atomic/obj.form/form.model';
import type { FieldValues } from 'react-hook-form';

export const CustomValidator = <T extends FieldValues>(validate: ValidateFunctionType<T>): ValidatorReturnType<T> => {
  return {
    validate,
  };
};
