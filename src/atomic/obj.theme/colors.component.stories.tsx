import type { Meta, StoryObj } from '@storybook/react';

import { ColorsSamples } from './colors.samples';

const meta: Meta<null> = {
  title: 'Atomic/Objects/Colors',
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => <ColorsSamples />,
};
