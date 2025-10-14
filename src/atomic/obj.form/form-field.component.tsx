import { InputLabel, InputLegend } from '@atomic/atm.typography';
import * as React from 'react';
import { type FieldValues, type Path, useController, useFormContext } from 'react-hook-form';
import { tv } from 'tailwind-variants';
import type { InputType } from './form.model';
import { getRulesFromValidators } from './form.utils';
import { FormFieldCaption } from './form-field-caption.component';

interface FormFieldProps<T extends FieldValues> extends InputType<T> {
  label?: string;
  className?: string;
}

const DefaultValues: Record<string, any> = {
  CheckboxInput: [],
  DatePickerInput: new Date(),
  RadioInput: '',
  SelectInput: '',
  StepperInput: 0,
  SwitchInput: false,
  TextareaInput: '',
  TextInput: '',
};

type InputElementProps = {
  id?: string;
  invalid?: boolean;
  ref?: React.Ref<unknown>;
  name?: string;
  value?: unknown;
  onChange?: (...args: any[]) => void;
  onBlur?: (...args: any[]) => void;
  disabled?: boolean;
  [key: string]: any;
};

export function FormField<TFieldValues extends FieldValues>(
  props: React.PropsWithChildren<FormFieldProps<TFieldValues>>,
) {
  const { validators = [], disabled, name, defaultValue: componentDefaultValue, className } = props;
  const _id = React.useId();

  const formContext = useFormContext();

  if (!formContext) {
    throw new Error('FormField component should be used inside Form component');
  }

  const childrenInputs = React.Children.toArray(props.children).filter(
    child => React.isValidElement(child) && (child.type as any)?.displayName?.endsWith('Input'),
  );

  const defaultValue =
    componentDefaultValue ??
    (React.isValidElement(childrenInputs[0]) && DefaultValues[(childrenInputs[0]?.type as any)?.displayName]) ??
    undefined;

  const rules = getRulesFromValidators(validators);
  const { field, fieldState } = useController({
    name: name as Path<TFieldValues>,
    rules,
    defaultValue,
  });

  const isRequired = props.validators?.some(validator => validator.required);

  const isFieldset = React.Children.count(props.children) > 1;

  const FieldElement = isFieldset ? 'fieldset' : 'div';

  const id = React.useId();

  return (
    <FieldElement id={id} className={formField({ className })}>
      {!!props.label &&
        (isFieldset ? (
          <InputLegend hasError={!!fieldState.error} isRequired={isRequired}>
            {props.label}
          </InputLegend>
        ) : (
          <InputLabel hasError={!!fieldState.error} htmlFor={id} isRequired={isRequired}>
            {props.label}
          </InputLabel>
        ))}

      {React.Children.map(props.children, child => {
        if (
          React.isValidElement(child) &&
          typeof (child.type as React.ComponentType)?.displayName === 'string' &&
          (child.type as React.ComponentType)?.displayName?.endsWith('Input')
        ) {
          const inputElement = child as React.ReactElement<InputElementProps>;

          return React.cloneElement(inputElement, {
            ...inputElement.props,
            id: isFieldset ? undefined : id,
            invalid: fieldState.invalid,
            ref: field.ref,
            name: field.name,
            value: field.value,
            onChange: field.onChange,
            onBlur: field.onBlur,
            disabled: disabled || Boolean(inputElement.props.disabled),
          });
        }

        if (process.env.NODE_ENV !== 'production') {
          // biome-ignore lint/suspicious/noConsole: Intentional
          console.warn(
            'FormField component should have children components with displayName ending with "Input" to receive field props',
          );
        }

        return child;
      })}

      <FormFieldCaption error={fieldState.error} />
    </FieldElement>
  );
}

const formField = tv({
  base: '[&+&]:mt-md',
});
