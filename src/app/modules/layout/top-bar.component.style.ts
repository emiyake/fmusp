import { tv } from 'tailwind-variants';

export const style = tv({
  slots: {
    background: [
      'fixed inset-x-0 bg-linear-to-b from-background to-fixed-transparent z-50 px-sm pt-md w-full',
      "before:content-[''] before:absolute before:inset-sm before:top-sm before:mx-sm before:bg-fixed-black/30 dark:before:bg-fixed-white/10 before:rounded-xl",
    ],
    content: ['h-[60px] border-b border-fixed-white/8 bg-fixed-black rounded-xl shadow-md relative flex items-center'],
  },
});
