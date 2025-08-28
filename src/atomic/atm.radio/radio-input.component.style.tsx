import { type VariantProps, tv } from 'tailwind-variants';

import { input } from '@atomic/atm.typography';
import { focusStyles } from '@atomic/obj.mixin';

export const style = tv({
  slots: {
    wrapper: ['cursor-pointer flex items-start rounded', focusStyles],
    value: [input({ type: 'value' }), 'pl-[28px] leading-[28px] cursor-pointer'],
    bullet: 'opacity-0 w-0 peer/bullet',
    checked: 'top-[2px] text-primary absolute z-1 opacity-0 text-[24px]! peer-checked/bullet:opacity-100',
    unchecked: 'top-[2px] text-primary absolute z-0 opacity-100 text-[24px]! peer-checked/bullet:opacity-0',
  },
  variants: {
    disabled: {
      true: {
        wrapper: 'cursor-default opacity-60',
        value: 'cursor-default',
      },
    },
  },
});

export type StyleVariants = VariantProps<typeof style>;
