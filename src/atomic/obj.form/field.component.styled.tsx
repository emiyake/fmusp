import { focusStyles } from '@atomic/obj.mixin';
import { tv } from 'tailwind-variants';

export interface FieldProps {
  invalid?: boolean;
  disabled?: boolean;
}

export const field = tv({
  slots: {
    border: [
      'rounded-lg overflow-hidden border border-neutral-soft ',
      'hover:ring-2 hover:ring-primary/50',
      'focus:border-primary/50 focus:outline-hidden',
      'disabled:ring-0',
    ],
    content: [
      'text-neutral-strong, disabled:text-neutral placeholder:text-neutral transition-all appearance-none bg-neutral-xxsoft px-sm h-[44px] w-full font-primary text-sm',
      focusStyles,
      'disabled:bg-background',
      'dark:bg-background dark:disabled:bg-fixed-transparent', // Dark mode
    ],
  },
  variants: {
    invalid: {
      true: {
        border: 'border-feedback-danger',
        content: 'text-feedback-danger',
      },
    },
  },
});
