import { tv } from 'tailwind-variants';

export const style = tv({
  base: 'overflow-hidden invisible transition-[max-height,visibility] max-h-0',
  variants: {
    expanded: {
      true: 'visible',
    },
  },
});
