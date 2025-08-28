import { tv } from 'tailwind-variants';

import { typography } from '@atomic/atm.typography';

export const style = tv({
  slots: {
    table: 'border-solid border-0 w-full border-separate border-spacing-0	text-center text-neutral-xstrong',
    thead: '[thead>&]:scale-100 bg-background-strong',
    tbody: '',
    th: 'py-md px-sm text-center text-sm first:rounded-s-lg last:rounded-e-lg',
    tr: '[thead>&:hover]:scale-100 [:not(thead)>&:hover]:scale-[1.01] transition-[transform] even:bg-background',
    td: [typography().p(), 'p-sm'],
  },
  variants: {
    disabled: {
      true: {
        tr: 'scale-100!',
      },
    },
  },
});
