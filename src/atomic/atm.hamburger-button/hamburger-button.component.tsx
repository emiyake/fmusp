import type * as React from 'react';

import { hamburgerButtonStrings } from './hamburger-button.component.strings';
import { style } from './hamburger-button.component.style';

export interface HamburgerButtonProps {
  active?: boolean;
  onClick?: () => void;
}

export const HamburgerButton: React.FC<HamburgerButtonProps> = ({ active = false, onClick }) => {
  const ariaLabel = active ? hamburgerButtonStrings.close : hamburgerButtonStrings.open;
  return (
    <button className={style().button()} onClick={onClick} type="button" aria-label={ariaLabel} aria-expanded={active}>
      <span className={style().inner({ active })} />
    </button>
  );
};
