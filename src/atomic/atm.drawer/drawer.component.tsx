import type * as React from 'react';

import { drawerStrings } from './drawer.component.strings';
import { style } from './drawer.component.style';

export interface DrawerProps {
  active?: boolean;
  onOverlayClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = props => (
  <div
    className={style().drawer({
      active: props.active,
      className: props.className,
    })}>
    <div className={style().menu({ active: props.active })}>{props.children}</div>
    <button
      aria-label={drawerStrings.close}
      className={style().overlay({ active: props.active })}
      onClick={props.onOverlayClick}
      type="button"
    />
  </div>
);
