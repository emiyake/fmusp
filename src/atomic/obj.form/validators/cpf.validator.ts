import type { ValidatorReturnType } from '@atomic/obj.form/form.model';
import { validateCpf } from '@utils/document.utils';
import type { FieldValues } from 'react-hook-form';
import { strings } from './validators.strings';

const defaultMessage = strings.cpf;

export const CpfValidator = <T extends FieldValues>(message: string = defaultMessage): ValidatorReturnType<T> => {
  return {
    validate: cpf => validateCpf(cpf) || message,
  };
};
