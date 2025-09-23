import type React from 'react';
import { type FieldPath, type FieldValues, FormProvider, useForm } from 'react-hook-form';

interface FormProps<T extends FieldValues> {
  onSubmit: (data: T) => void;
  children: React.ReactElement<{ name: FieldPath<T> }> | React.ReactElement<{ name: FieldPath<T> }>[];
}

export const Form = <T extends FieldValues>(props: FormProps<T>) => {
  const form = useForm<T>();

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(props.onSubmit)}>{props.children}</form>
    </FormProvider>
  );
};
