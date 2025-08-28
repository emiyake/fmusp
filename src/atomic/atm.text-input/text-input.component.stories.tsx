import type * as React from 'react';

import { TextAreaInput } from '@atomic/atm.text-input';
import { H3 } from '@atomic/atm.typography';
import { Form, FormField } from '@atomic/obj.form';

export default {
  title: 'Atomic/Atoms/TextInput',
};

interface TextInputStoryProps {
  onValueChange?: (value?: number | string | string[]) => void;
}

export const TextArea: React.FC<TextInputStoryProps> = () => {
  return (
    <Form onSubmit={console.log}>
      <H3>Text area</H3>
      <FormField name="plate" label="Text area with FormField wrapper">
        <TextAreaInput placeholder="TextArea" />
      </FormField>

      <button type="submit">Submit</button>
    </Form>
  );
};
