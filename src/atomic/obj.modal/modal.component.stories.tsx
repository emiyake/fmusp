import * as React from 'react';

import type { Meta } from '@storybook/react';

import { Button } from '@atomic/atm.button';
import { Body, H3 } from '@atomic/atm.typography';
import { Separator } from '@atomic/obj.separator';

import { Modal } from './modal.component';

export default {
  title: 'Atomic/Objects/Modal',
  argTypes: {
    small: {
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

export const ModalStory: React.FC<any> = props => {
  const [open, setOpen] = React.useState(false);

  function handleClick(): void {
    alert('clicked');
  }

  return (
    <div>
      <Modal opened={open} small={props.small} onClose={() => setOpen(false)}>
        <H3>Content</H3>
        <Body>Use sidebar knob to toggle to small modal.</Body>
        <Separator />
        <Button variant="primary" onClick={handleClick}>
          Click
        </Button>
      </Modal>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open modal
      </Button>
    </div>
  );
};
