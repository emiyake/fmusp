import { Body } from '@atomic/atm.typography';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './card.component';

const meta: Meta<typeof Card> = {
  title: 'Atomic/Atoms/Card',
  component: Card,
  args: {
    noBorder: false,
    noShadow: false,
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Primary: Story = {
  args: {
    noBorder: true,
    noShadow: true,
  },
  render: args => (
    <Card {...args}>
      <Card.Item>
        <Body>Card Item</Body>
      </Card.Item>
    </Card>
  ),
};
