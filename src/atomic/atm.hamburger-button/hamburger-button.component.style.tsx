import { tv } from 'tailwind-variants';

export const style = tv({
  slots: {
    button: 'inline-block border-0 bg-fixed-transparent relative m-0 w-lg h-lg tap-highlight',
    inner: [
      'top-[50%] -mt-px rotate-0 left-0',
      'block, absolute w-lg h-[2px] bg-neutral-xstrong rounded-[4px]',
      "before:content-[''] before:block before:absolute before:w-lg before:h-[2px] before:bg-neutral-xstrong before:rounded-[4px]",
      'before:top-[-6px] before:opacity:1',
      "after:content-[''] after:block after:absolute after:w-lg after:h-[2px] after:bg-neutral-xstrong after:rounded-[4px]",
      'after:bottom-[-6px]',
      'duration-200 ease before:transition-all after:transition-all', // Transition
    ],
  },
  variants: {
    active: {
      true: {
        inner: ['rotate-225', 'before:opacity-0 before:top-0', 'after:-rotate-90 after:bottom-0'],
      },
    },
  },
});
