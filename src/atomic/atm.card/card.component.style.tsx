import { tv } from 'tailwind-variants';

export const card = tv({
  slots: {
    back: '',
    front: [
      'shadow-md shadow-background-strong p-[0.05px] relative bg-neutral-xxsoft rounded-lg border-background-strong border h-full',
      'dark:border-background dark:shadow-background',
    ],
    item: '',
  },
  compoundSlots: [
    {
      slots: ['back', 'front'],
      class: '', // --> these classes will be applied to  slots box and front
    },
  ],
  variants: {
    double: {
      true: {
        back: [
          'relative before:box before:absolute before:left-sm before:right-sm before:mt-xs before:bottom-[-12px] before:h-full before:bg-slate-50 before:content-[""] before:bg-neutral-xxsoft before:rounded-lg before:border-background-strong before:border before:shadow-xs',
        ],
      },
    },
    verticalPadding: {
      true: {
        item: 'my-md',
      },
    },
    horizontalPadding: {
      true: {
        item: 'mx-md',
      },
    },
    noShadow: {
      true: {
        front: 'shadow-none',
      },
    },
    noBorder: {
      false: {
        front: 'border border-neutral-soft',
      },
    },
  },
});
