import { tv } from 'tailwind-variants';

export const pager = tv({
  base: 'w-[10px] h-[10px] rounded-[50%] inline-block bg-accessory opacity-50 [&+&]:ml-xs',
  variants: {
    active: {
      true: 'opacity-100',
    },
  },
});
