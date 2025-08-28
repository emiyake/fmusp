import type * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter, Route, Routes } from 'react-router';

import { FaIcon } from '@atomic/atm.fa-icon';
import { Body } from '@atomic/atm.typography';
import { Separator } from '@atomic/obj.separator';
import { fn } from '@storybook/test';

import { Button, type ButtonProps } from './button.component';
import { LinkButton } from './link-button.component';

const meta: Meta<typeof Button> = {
  title: 'Atomic/Atoms/Button',
  component: Button,
  args: {
    onClick: fn(),
    className: 'mr-xs mt-xs',
    outlined: false,
    link: false,
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'inline-radio' },
    },
    variant: {
      options: ['primary', 'secondary', 'cta', 'danger', 'neutral'],
      control: { type: 'inline-radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const ButtonWithLabel: Story = {
  render: args => (
    <>
      <Body>Keyboard testing: Focus with the Tab key, then activate the focused button with Space or Enter keys</Body>
      <Separator />
      {['primary', 'secondary', 'cta', 'danger'].map((variant: any) => (
        <Button key={variant} variant={variant} {...args} className="mt-xs mr-xs">
          <FaIcon.Home />
          {variant}
        </Button>
      ))}
    </>
  ),
};

export const LinkButtons: React.FC<ButtonProps> = props => (
  <BrowserRouter>
    <Routes>
      <Route
        path="*"
        element={
          <LinkButton variant="primary" to="route" {...props} className="mt-xs mr-xs">
            <FaIcon.Home />
            Router link
          </LinkButton>
        }
      />
    </Routes>
  </BrowserRouter>
);
