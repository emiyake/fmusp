import { HamburgerButton as HamburgerButtonComponent, type HamburgerButtonProps } from '@atomic/atm.hamburger-button';

import type { Meta } from '@storybook/react';
import type * as React from 'react';

export default {
  title: 'Atomic/Atoms/Hamburger Button',
  component: HamburgerButtonComponent,
} as Meta;

export const HamburgerButton: React.FC<HamburgerButtonProps> = props => <HamburgerButtonComponent {...props} />;
