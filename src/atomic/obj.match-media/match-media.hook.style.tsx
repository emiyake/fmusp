import { tv } from 'tailwind-variants';

export const style = tv({
  slots: {
    container: 'p-md border border-accessory rounded-lg my-md',
    title: 'text-lg font-semibold',
    text: 'text-sm',
    mediaQuery: 'text-xs font-mono bg-background p-sm rounded',
    statusBox: 'text-white p-sm rounded font-bold text-center mt-sm',
  },
  variants: {
    active: {
      true: { statusBox: 'bg-feedback-success' },
      false: { statusBox: 'bg-feedback-danger' },
    },
  },
});
