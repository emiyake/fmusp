import type * as React from 'react';

import { TextInput } from '@atomic/atm.text-input';
import { H3 } from '@atomic/atm.typography';
import { Form, FormField } from '@atomic/obj.form';

export default {
  title: 'Atomic/Atoms/TextInput',
  tags: ['text-input'],
  argTypes: {
    type: {
      options: ['email', 'text', 'number', 'password'],
      control: { type: 'select' },
    },
  },
};

interface TextFieldStoryProps {
  type?: 'email' | 'text' | 'number' | 'password';
  value?: string;
  customMask?: string;
  onValueChange?: (value?: number | string | string[]) => void;
}

export const Controlled: React.FC<TextFieldStoryProps> = props => {
  return (
    <Form onSubmit={console.log}>
      <H3>Controlled</H3>
      <FormField name="maskless" label="Text input with FormField wrapper">
        <TextInput type={props.type ?? 'text'} />
      </FormField>

      <button type="submit">Submit</button>
    </Form>
  );
};
