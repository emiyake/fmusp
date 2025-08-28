import type * as React from 'react';
import { type ChipStyleVariants, chipStyle } from './chip.component.style';

type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

export interface ChipProps extends ChipStyleVariants {
  id?: string;
  selected?: boolean;
  disabled?: boolean;
  buttonProps?: ButtonProps;
  children: React.ReactNode;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  variant,
  size,
  selected,
  className,
  id,
  children,
  disabled,
  buttonProps = {},
}) => {
  const chipClasses = chipStyle({ variant, size, disabled, selected });

  return (
    <button
      id={id}
      type="button"
      className={`${chipClasses.base()} ${className}`}
      disabled={disabled}
      aria-pressed={selected}
      {...buttonProps}>
      {children}
    </button>
  );
};
