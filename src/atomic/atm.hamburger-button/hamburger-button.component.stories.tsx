import type * as React from 'react';

import type { Meta } from '@storybook/react';

import { HamburgerButton as HamburgerButtonComponent, type HamburgerButtonProps } from '@atomic/atm.hamburger-button';

export default {
  title: 'Atomic/Atoms/Hamburger Button',
  component: HamburgerButtonComponent,
} as Meta;

export const HamburgerButton: React.FC<HamburgerButtonProps> = props => <HamburgerButtonComponent {...props} />;
