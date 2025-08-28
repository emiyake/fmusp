import type * as React from 'react';

import type { Meta } from '@storybook/react';

import { Drawer as DrawerComponent, type DrawerProps } from './drawer.component';

export default {
  title: 'Atomic/Atoms/Drawer',
  component: DrawerComponent,
} as Meta;

export const Drawer: React.FC<DrawerProps> = props => (
  <DrawerComponent {...props} className="top-[164px]">
    This is the drawer
  </DrawerComponent>
);
