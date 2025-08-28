import { tv } from 'tailwind-variants';

import { field } from '@atomic/obj.form/field.component.styled';

export const style = tv({
  slots: {
    wrapper: [field().content(), field().border(), 'flex items-center relative pl-[42px]'],
    input: 'absolute z-[-1] w-[0.1px] h-[0.1px] opacity-0 border-0 overflow-hidden ',
    icon: 'absolute z-1 top-[120x] left-[12px] text-[20px] text-neutral-strong',
  },
  variants: {
    empty: {
      true: {
        wrapper: 'text-neutral',
      },
    },
  },
});
