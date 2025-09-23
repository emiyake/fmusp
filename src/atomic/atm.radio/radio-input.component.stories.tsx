import { Body, H3 } from '@atomic/atm.typography';
import { Form, FormField } from '@atomic/obj.form';
import { Separator } from '@atomic/obj.separator';
import type { Meta } from '@storybook/react';
import type * as React from 'react';
import { RadioInput } from './radio-input.component';

const VALUE_OPTIONS = ['4', '5', '6'];

export default {
  title: 'Atomic/Atoms/RadioInput',
  argTypes: {
    value: {
      control: 'select',
      options: VALUE_OPTIONS,
    },
  },
} as Meta;

interface RadioInputStoryProps {
  onValueChange?: (value: any, others: any) => void;
  onClick?: (id: any) => void;
  value?: string;
}

export const Controlled: React.FC<RadioInputStoryProps> = () => {
  return (
    <Form onSubmit={data => console.log(data)}>
      <H3>Controlled</H3>
      <Separator />
      <Body>
        Keyboard testing: Focus on the radio group by pressing Tab once, then use arrow keys to change the current
        selection. Press Tab again to exit the radio group.
      </Body>
      <Separator />

      <FormField name="radio" label="Radio field with FormField wrapper">
        <RadioInput radioId="1">Value 1</RadioInput>
        <RadioInput radioId="2">Value 2</RadioInput>
        <Body> Some Text </Body>
        <RadioInput radioId="3">Value 3</RadioInput>
      </FormField>
    </Form>
  );
};
