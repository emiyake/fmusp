import { tv } from 'tailwind-variants';

export const style = tv({
  slots: {
    wrapper: [
      'relative pointer text-sm grid grid-flow-col grid-cols-[repeat(var(--number-of-items),minmax(0,1fr))] z-0',
      'after:content-[""] after:pointer-events-none after:absolute after:h-full after:bg-primary after:z-[-1] after:rounded-md after:w-(--item-width) after:translate-x-(--translate) after:transition-transform',
    ],
    button: [
      'min-h-[44px] text-neutral-strong rounded-lg px-md py-sm transition-colors',
      'flex items-center justify-center gap-xs',
    ],
  },
  variants: {
    selected: {
      true: {
        button: 'text-fixed-white',
      },
    },
  },
});
