import { type FieldValues, type Path, get, useFormContext, useFormState } from 'react-hook-form';

export const useFormFieldState = <T extends FieldValues>(name: Path<T>) => {
  const formContext = useFormContext();

  if (!formContext) {
    throw new Error('useFormFieldState hook should be used inside Form component');
  }

  const { errors } = useFormState({ name, exact: true });

  return {
    invalid: !!errors[name],
    error: get(errors, name),
  };
};
