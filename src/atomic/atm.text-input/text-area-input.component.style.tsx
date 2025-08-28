import { tv } from 'tailwind-variants';

import { field } from '@atomic/obj.form/field.component.styled';

const { border, content } = field();

export const style = tv({
  base: [border(), content(), 'p-sm m-w-full min-h-[44px] overflow-auto'],
  variants: {
    invalid: {
      true: [content({ invalid: true }), border({ invalid: true })],
    },
  },
});
