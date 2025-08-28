import { tv } from 'tailwind-variants';

export const style = tv({
  slots: {
    wrapper: 'absolute invisible z-50',
    overlay: 'fixed top-0 right-0 bottom-0 left-0 bg-neutral opacity-0 transition-all invisible duration-300',
    close: 'absolute top-0 right-0 p-md text-neutral-strong cursor-pointer',
    box: [
      'fixed top-[80px] left-[50%] translate-x-[-50%]  translate-y-[-50%]', // positioning
      'p-md w-[90%] m-w-[90%] m-h-[80%] overflow-auto overscroll-contain', // size
      'bg-background rounded-lg opacity-0', // styling
      'transition-all', //animation
    ],
  },
  variants: {
    opened: {
      true: {
        wrapper: 'visible',
        overlay: 'opacity-30 visible',
        box: 'translate-y-[0%] opacity-100',
      },
    },
  },
});
