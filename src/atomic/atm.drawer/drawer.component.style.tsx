import { tv } from 'tailwind-variants';

export const style = tv({
  slots: {
    drawer: 'fixed w-full h-full top-0 left-0 z-[-1]',
    menu: [
      'overscroll-contain	absolute bg-background top-0 z-initial overflow-hidden',
      'w-[256px] h-full left-[-256px] transition-[left]',
    ],
    overlay:
      'absolute w-full h-full right-0 top-0 bg-fixed-black opacity-0 z-[-1] pointer-events-none transition-opacity ease-out',
  },
  variants: {
    active: {
      true: {
        drawer: 'z-99',
        menu: 'z-2 left-0',
        overlay: 'opacity-30 z-1 pointer-events-auto',
      },
    },
  },
});
