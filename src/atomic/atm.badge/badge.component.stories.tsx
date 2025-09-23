import { Badge } from '@atomic/atm.badge';
import { Body } from '@atomic/atm.typography';
import { Separator } from '@atomic/obj.separator';
import type { Meta, StoryObj } from '@storybook/react';
import { BadgeRound } from './badge-round.component';

const meta: Meta<typeof Badge> = {
  title: 'Atomic/Atoms/Badge',
  component: Badge,
  argTypes: {
    color: {
      options: ['primary', 'secondary', 'danger', 'success', 'neutral'],
      control: { type: 'inline-radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  render: args => (
    <>
      {['primary', 'secondary', 'danger', 'success', 'neutral'].map((variant: any) => (
        <Badge color={variant} key={variant} className="mr-xs" {...args}>
          {variant}
        </Badge>
      ))}
      <Separator />

      <Body>BadgeRound</Body>
      <BadgeRound>2</BadgeRound>
      <BadgeRound>20</BadgeRound>
      <BadgeRound>200</BadgeRound>
    </>
  ),
};
