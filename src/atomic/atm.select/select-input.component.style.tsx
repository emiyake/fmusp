import { field } from '@atomic/obj.form/field.component.styled';
import { focusStyles } from '@atomic/obj.mixin';
import { tv } from 'tailwind-variants';

export const style = tv({
  slots: {
    border: [field().border(), 'relative', focusStyles],
    select: [field().content(), 'rounded-lg focus:outline-none'],
    icon: 'absolute top-[10px] right-sm text-neutral pointer-events-none text-[24px]',
  },
  variants: {
    invalid: {
      true: {
        border: field().border({ invalid: true }),
        select: field().content({ invalid: true }),
      },
    },
  },
});
