import { tv } from 'tailwind-variants';

export const style = tv({
  slots: {
    ul: 'flex space-x-1',
    li: 'flex-1 sm:flex-initial ',
    separator: 'p-4 border-0 text-neutral inline-block',
  },
});

export const link = tv({
  base: 'py-sm px-md border text-neutral font-primary rounded-md hover:bg-neutral-xsoft',
  variants: {
    active: {
      true: 'bg-primary text-fixed-white hover:bg-primary/70',
    },
  },
});
