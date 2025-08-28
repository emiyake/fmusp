import type React from 'react';

import type { Meta } from '@storybook/react';

import { Button } from '@atomic/atm.button';

import { ScreenPlaceholder as ScreenPlaceholderComponent } from './screen-placeholder.component';

export default {
  title: 'Atomic/Organisms/Screen Placeholder',
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    message: {
      control: { type: 'text' },
    },
  },
} as Meta;

export const ScreenPlaceholder: React.FC<any> = props => (
  <ScreenPlaceholderComponent
    src="https://placehold.co/225x225"
    title={props.title ?? 'Title'}
    message={props.message ?? 'Mensagem'}>
    <Button variant="primary" outlined expanded>
      Ação
    </Button>
  </ScreenPlaceholderComponent>
);
