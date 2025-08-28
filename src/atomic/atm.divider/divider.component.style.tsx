import type React from 'react';
import { tv } from 'tailwind-variants';

export const style = tv({
  base: ['h-px w-full bg-neutral-soft dark:bg-neutral-soft/40'],
});

export const Divider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={style({ className })} />
);
