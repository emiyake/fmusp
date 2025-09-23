import { Form, FormField } from '@atomic/obj.form';

import type { Meta } from '@storybook/react';
import type * as React from 'react';
import { SwitchInput as SwitchComponent, type SwitchProps } from './switch-input.component';

export default {
  title: 'Atomic/Atoms/SwitchInput',
  argTypes: {
    disabled: { control: { type: 'boolean' } },
  },
} as Meta;

export const Switch: React.FC<SwitchProps> = props => {
  return (
    <Form onSubmit={console.log}>
      <FormField name="switch" disabled={props.disabled} label="Switch field with FormField wrapper">
        <SwitchComponent id={0} ariaLabel="Switch" />
      </FormField>

      <button type="submit">Submit</button>
    </Form>
  );
};
