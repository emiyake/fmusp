import type * as React from 'react';

import type { Meta } from '@storybook/react';

import { Divider as DividerComponent } from './divider.component.style';

export default {
  title: 'Atomic/Atoms/Divider',
  component: DividerComponent,
} as Meta;

export const Divider: React.FC = () => <DividerComponent />;
