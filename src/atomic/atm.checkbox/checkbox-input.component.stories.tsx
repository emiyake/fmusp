import type * as React from 'react';

import type { Meta } from '@storybook/react';

import { Body, H2 } from '@atomic/atm.typography';
import { Separator } from '@atomic/obj.separator';

import { Form, FormField } from '@atomic/obj.form';
import { CheckboxInput } from './checkbox-input.component';

const TOGGLE_OPTIONS = ['2', '6', '7', '8'];

export default {
  title: 'Atomic/Atoms/CheckboxInput',
  argTypes: {
    disabled: { control: { type: 'boolean' } },
  },
} as Meta;

export const ControlledCheckbox: React.FC<{ disabled?: boolean }> = props => {
  return (
    <Form onSubmit={data => console.log(data)}>
      <H2>Controlled</H2>
      <Body>Keyboard testing: Focus with the Tab key, then toggle the focused checkbox with the Space key</Body>
      <Separator />
      <FormField name="checkbox" label="Checkbox field with FormField wrapper">
        {TOGGLE_OPTIONS.map(option => (
          <CheckboxInput checkboxId={option} key={option} disabled={props.disabled}>
            Value {option}
          </CheckboxInput>
        ))}
      </FormField>
    </Form>
  );
};
