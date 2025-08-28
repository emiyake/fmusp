import { type FieldValues, type Path, useFormContext, useWatch } from 'react-hook-form';

export const useFormFieldWatch = <T extends FieldValues>(name: Path<T>) => {
  const formContext = useFormContext();

  if (!formContext) {
    throw new Error('useFormFieldWatch hook should be used inside Form component');
  }

  const value = useWatch({ exact: true, name });

  return value;
};
