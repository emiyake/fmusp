import type { Meta, StoryObj } from '@storybook/react';

import { Banner } from './banner.component';

const meta: Meta<typeof Banner> = {
  title: 'Atomic/Atoms/Banner',
  component: Banner,
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Primary: Story = {
  args: {
    url: 'https://via.placeholder.com/200',
  },
};
