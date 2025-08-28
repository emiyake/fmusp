import type * as React from 'react';

import type { Meta } from '@storybook/react';

import { H2 } from '@atomic/atm.typography';

import { ShimmerBox } from './shimmer.component';

export default { title: 'Atomic/Molecules/Shimmer' } as Meta;

export const Text: React.FC = () => (
  <div>
    <H2>Text</H2>
    <ShimmerBox height="20px" />
  </div>
);
