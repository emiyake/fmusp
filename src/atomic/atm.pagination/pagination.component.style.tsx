import { tv } from 'tailwind-variants';

export const style = tv({
  slots: {
    ul: 'flex space-x-xs',
    li: 'flex-1 sm:flex-initial ',
    separator: 'p-4 text-neutral inline-block',
  },
});

export const link = tv({
  base: 'py-sm px-md  text-neutral font-primary text-sm rounded-lg hover:bg-neutral-soft',
  variants: {
    active: {
      true: 'bg-neutral-xxsoft border border-neutral-soft  hover:bg-neutral-xxsoft',
    },
  },
});
