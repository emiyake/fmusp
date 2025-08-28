import type { Meta } from '@storybook/react';

import { LoadingCentered } from './loading.component';

export default {
  title: 'Atomic/Molecules/Loading Centered',
} as Meta;

export const Loading = () => (
  <div className="h-screen w-screen">
    <LoadingCentered />
  </div>
);
