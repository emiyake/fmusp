import { Button } from '@atomic/atm.button';
import { Form, FormField } from '@atomic/obj.form';
import type { Meta } from '@storybook/react';
import type * as React from 'react';
import { DragNDropFile as DragNDropFileComponent, type DragNDropFileProps } from './drag-n-drop-file.component';

export default {
  title: 'Atomic/Molecules/Drag and drop',
  argTypes: {
    onClick: { action: 'submit' },
    onDrop: { action: 'onDrop' },
  },
} as Meta;

export const DragNDropFile: React.FC<DragNDropFileProps & { onClick?: any; onDrop?: any }> = props => {
  return (
    <Form onSubmit={props.onClick}>
      <FormField name="file" label="File field with FormField wrapper">
        <DragNDropFileComponent dropMessage="Soltar aqui">
          <div className="mb-sm flex h-[100px] w-full items-center justify-center bg-neutral-xsoft">Arrastar aqui</div>
        </DragNDropFileComponent>
      </FormField>
      <Button type="submit" variant="primary">
        Enviar
      </Button>
    </Form>
  );
};
