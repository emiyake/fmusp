import type React from 'react';
import { tv } from 'tailwind-variants';

export interface PlainButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const PlainButton: React.FC<PlainButtonProps> = ({ className, children, onClick, disabled, type, ...rest }) => {
  return (
    <button
      className={style({ ...rest, class: className })}
      onClick={onClick}
      disabled={disabled}
      type={type ?? 'button'}>
      {children}
    </button>
  );
};

const style = tv({
  base: [
    'transition duration-200 cursor-pointer',
    'focus:outline-hidden',
    'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-80',
    '[&:hover:not(:disabled)]:opacity-90',
    'disabled:opacity-70 disabled:cursor-not-allowed',
  ],
});
