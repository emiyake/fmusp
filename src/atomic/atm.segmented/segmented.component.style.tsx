import { tv } from 'tailwind-variants';

export const style = tv({
  slots: {
    wrapper: [
      'relative pointer text-sm grid grid-flow-col grid-cols-[repeat(var(--number-of-items),minmax(0,1fr))] z-0',
      'after:content-[""] after:pointer-events-none after:absolute after:h-full after:z-[-1] after:rounded-md after:w-(--item-width) after:translate-x-(--translate) after:transition-transform',
    ],
    button: [
      'min-h-[32px] text-neutral-strong rounded-lg px-md py-sm transition-colors',
      'flex items-center justify-center gap-xs',
    ],
  },
  variants: {
    variant: {
      primary: {
        wrapper: 'after:bg-primary',
      },
      secondary: {
        wrapper: 'after:bg-secondary',
      },
      neutral: {
        wrapper: 'after:bg-neutral-strong',
      },
    },
    selected: {
      true: {
        button: 'text-fixed-white',
      },
    },
    disabled: {
      true: {
        button: 'opacity-50 cursor-not-allowed pointer-events-none',
      },
    },
  },
});
