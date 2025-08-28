import type * as React from 'react';

import { FaIcon } from '@atomic/atm.fa-icon';
import { TextFieldMasks, TextInput } from '@atomic/atm.text-input';
import { H3 } from '@atomic/atm.typography';
import { Form, FormField } from '@atomic/obj.form';

export default {
  title: 'Atomic/Atoms/TextInput',
  tags: ['text-input'],
  argTypes: {
    customMask: { control: { type: 'text' } },
  },
};

interface TextInputStoryProps {
  type?: 'email' | 'text' | 'number' | 'password';
  customMask?: string;
  onValueChange?: (value?: number | string | string[]) => void;
}

export const MaskedCPF: React.FC<TextInputStoryProps> = () => {
  return (
    <Form onSubmit={console.log}>
      <H3>Masked (CPF)</H3>

      <FormField name="cpf" label="Text input with FormField wrapper">
        <TextInput mask={TextFieldMasks.cpf()} />
      </FormField>

      <button type="submit">Submit</button>
    </Form>
  );
};

export const WithIconAndMask: React.FC<TextInputStoryProps> = props => {
  return (
    <Form onSubmit={console.log}>
      <H3>With icon and custom mask</H3>

      <FormField name="plate" label="Text input with FormField wrapper">
        <TextInput
          placeholder="ex: AAA-9999"
          mask={props.customMask ? TextFieldMasks.custom(props.customMask) : undefined}
          icon={<FaIcon.Search />}
        />
      </FormField>

      <button type="submit">Submit</button>
    </Form>
  );
};

export const CustomMask: React.FC<TextInputStoryProps> = props => {
  return (
    <Form onSubmit={console.log}>
      <H3>Custom mask</H3>

      <FormField name="plate" label="Text input with FormField wrapper">
        <TextInput
          placeholder="ex: AAA-9999"
          mask={props.customMask ? TextFieldMasks.custom(props.customMask) : undefined}
          type={props.type}
        />
      </FormField>

      <button type="submit">Submit</button>
    </Form>
  );
};
