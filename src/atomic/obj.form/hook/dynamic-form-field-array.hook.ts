import type { ArrayFieldRulesType, ArrayPathType, RulesType } from '@atomic/obj.form/form.model';
import { getRulesFromValidators } from '@atomic/obj.form/form.utils';
import { type FieldError, type FieldValues, get, useFieldArray, useFormContext, useFormState } from 'react-hook-form';

export const useDynamicFormFieldArray = <T extends FieldValues>(params: {
  name: ArrayPathType<T>;
  validators?: RulesType<T>[];
}) => {
  const formContext = useFormContext();

  if (!formContext) {
    throw new Error('useDynamicFormField hook should be used inside Form component');
  }

  const { name, validators = [] } = params;

  const rules = getRulesFromValidators(validators) as ArrayFieldRulesType<T>;

  const fieldArrayMethods = useFieldArray({
    name,
    rules,
  });

  const { errors } = useFormState();

  return { ...fieldArrayMethods, error: get(errors, name)?.root as FieldError | undefined };
};
