import type * as React from 'react';

import { Form, FormField } from '@atomic/obj.form';
import type { Meta } from '@storybook/react';
import { FileInput, type FileInputProps } from './file-input.component';

export default {
  title: 'Atomic/Atoms/FileInput',
  component: FileInput,
  argTypes: {
    onValueChange: {
      action: 'onValueChange',
    },
  },
} as Meta;

export const FileInputs: React.FC<FileInputProps> = props => {
  return (
    <Form onSubmit={data => console.log(data)}>
      <FormField name="file" label="File field with FormField wrapper">
        <FileInput accept={props.accept} />
      </FormField>

      <input type="submit" />
    </Form>
  );
};
