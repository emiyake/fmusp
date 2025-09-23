import { tv } from 'tailwind-variants';

export const style = tv({
  slots: {
    wrapper: 'relative group mb-sm py-md',
    clickArea: 'absolute -inset-[4px] z-10 rounded-lg hidden bg-fixed-black/5 group-hover:flex justify-end',
    rendererWrapper: '',
    buttonWrapper: 'p-md flex items-center cursor-pointer text-neutral-strong',
  },
  variants: {
    noBlock: {
      true: {
        rendererWrapper: 'pr-[60px]',
        clickArea: 'bg-fixed-black/0',
      },
      false: {
        clickArea: 'left-[-6px] hover:bg-black/10 hover:cursor-text',
      },
    },
    alert: {
      true: {
        buttonWrapper: 'text-feedback-danger',
      },
    },
  },
});
