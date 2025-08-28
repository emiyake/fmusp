import { tv } from 'tailwind-variants';

export const icon = tv({
  base: 'text-neutral-strong text-sm',
  variants: {
    order: { true: 'text-neutral-strong' },
  },
});

export const wrapper = tv({ base: 'cursor-pointer hover:opacity-80 inline-block' });
