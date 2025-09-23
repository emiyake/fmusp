import { FaIcon } from '@atomic/atm.fa-icon';
import { TextInput } from '@atomic/atm.text-input';
import { H3 } from '@atomic/atm.typography';
import { Form, FormField } from '@atomic/obj.form';
import type * as React from 'react';

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

interface TextInputStoryProps {
  type?: 'email' | 'text' | 'number' | 'password';
  onValueChange?: (value: number | string | string[]) => void;
}

export const WithoutMask: React.FC<TextInputStoryProps> = props => {
  return (
    <Form onSubmit={console.log}>
      <H3>Without mask</H3>

      <FormField name="maskless" label="Text input with FormField wrapper">
        <TextInput type={props.type ?? 'text'} />
      </FormField>

      <button type="submit">Submit</button>
    </Form>
  );
};

export const WithIconAndWithoutMask: React.FC<TextInputStoryProps> = props => {
  return (
    <Form onSubmit={console.log}>
      <H3>With icon without mask</H3>
      <FormField name="withIcon" label="Text input with FormField wrapper">
        <TextInput type={props.type ?? 'text'} icon={<FaIcon.Home />} />
      </FormField>

      <button type="submit">Submit</button>
    </Form>
  );
};
