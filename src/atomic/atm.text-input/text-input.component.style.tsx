import { tv } from 'tailwind-variants';

import { field } from '@atomic/obj.form/field.component.styled';
import { focusStyles } from '@atomic/obj.mixin';

const { border, content } = field();

export const style = tv({
  slots: {
    field: [border(), content()],
    icon: 'absolute z-1 h-full w-[42px] flex items-center justify-center',
    iconButton: [
      'absolute top-[2px] right-xs text-primary p-sm',
      '[&>svg]:w-lg [&>svg]:h-lg',
      'focus:outline-none rounded',
      focusStyles,
    ],
  },
  variants: {
    icon: {
      true: {
        field: 'pl-[42px]',
      },
    },
    invalid: {
      true: {
        field: [content({ invalid: true }), border({ invalid: true })],
      },
    },
  },
});
