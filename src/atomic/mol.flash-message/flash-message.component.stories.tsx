import * as React from 'react';

import type { Meta } from '@storybook/react';

import { Button } from '@atomic/atm.button';
import { Body } from '@atomic/atm.typography';

import { FlashMessage, type FlashMessageProps } from '../mol.flash-message';

export default {
  title: 'Atomic/Molecules/Flash Message',
  component: FlashMessage,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['success', 'warning', 'danger', 'info'],
      },
    },
  },
} as Meta;

export const Example: React.FC<FlashMessageProps> = props => {
  const [timestamp, setTimestamp] = React.useState(Date.now());

  function handleClick() {
    setTimestamp(Date.now());
  }

  return (
    <div>
      <FlashMessage type="info" dismissible={props.dismissible} key={timestamp} autoClose={props.autoClose}>
        <Body>This is an example of an info flash message.</Body>
      </FlashMessage>
      <br />
      <FlashMessage type="success" dismissible={props.dismissible} key={timestamp} autoClose={props.autoClose}>
        <Body>This is an example of a succcess flash message.</Body>
      </FlashMessage>
      <br />
      <FlashMessage type="warning" dismissible={props.dismissible} key={timestamp} autoClose={props.autoClose}>
        <Body>This is an example of a warning flash message.</Body>
      </FlashMessage>
      <br />
      <FlashMessage type="danger" dismissible={props.dismissible} key={timestamp} autoClose={props.autoClose}>
        <Body>This is an example of an alert flash message.</Body>
      </FlashMessage>
      <br />
      <Button variant="primary" onClick={handleClick}>
        Show flash message again
      </Button>
    </div>
  );
};
