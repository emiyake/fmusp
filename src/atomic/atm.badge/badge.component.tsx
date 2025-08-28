import type * as React from 'react';

import { type StyleVariants, style } from './badge.component.style';

export interface BadgeProps extends StyleVariants {
  className?: string;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ children, ...props }) => (
  <span className={style({ ...props })}>{children}</span>
);
