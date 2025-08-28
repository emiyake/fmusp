import { focusStyles } from '@atomic/obj.mixin';
import { tv } from 'tailwind-variants';

export const style = tv({
  slots: {
    wrapper: 'bg-background rounded-md',
    button: [
      'leading-[12px] min-w-[12px] p-sm rounded-lg cursor-pointer border bg-primary border-primary text-fixed-white active:opacity-70',
      'focus:outline-none',
      focusStyles,
    ],
  },
  variants: {
    disabled: {
      true: {
        button: 'opacity-50',
      },
    },
    outlined: {
      true: {
        button: 'text-primary border-primary bg-fixed-white dark:bg-fixed-transparent',
      },
    },
  },
});
