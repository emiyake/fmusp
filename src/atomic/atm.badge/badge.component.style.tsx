import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const style = tv({
  base: ['py-xs px-md rounded-full', 'text-fixed-white font-normal font-primary'],
  variants: {
    color: {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      danger: 'bg-feedback-danger',
      success: 'bg-feedback-success',
      neutral: 'bg-neutral',
    },
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-md',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
});

export type StyleVariants = VariantProps<typeof style>;
