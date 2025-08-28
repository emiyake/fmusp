import type * as React from 'react';
import { tv } from 'tailwind-variants';

export interface BadgeRoundProps {
  className?: string;
  children: React.ReactNode;
}

export const BadgeRound: React.FC<BadgeRoundProps> = ({ children, className }) => (
  <span className={style({ className })}>{children}</span>
);

const style = tv({
  base: [
    'min-h-[20px] min-w-[20px] inline-flex items-center justify-center px-xs rounded-full bg-primary',
    'font-primary text-fixed-white font-normal text-xs text-center',
  ],
});
