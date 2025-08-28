import type { ValidatorReturnType } from '@atomic/obj.form/form.model';
import { validateCnpj } from '@utils/document.utils';
import type { FieldValues } from 'react-hook-form';
import { strings } from './validators.strings';

const defaultMessage = strings.cnpj;

export const CnpjValidator = <T extends FieldValues>(message: string = defaultMessage): ValidatorReturnType<T> => {
  return {
    validate: cnpj => validateCnpj(cnpj) || message,
  };
};
