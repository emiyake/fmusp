import { tv } from 'tailwind-variants';

export const style = tv({
  slots: {
    wrapper: 'group relative aspect-square rounded-lg overflow-hidden',
    image: 'absolute z-[-1] h-full w-full object-cover motion-safe:group-hover:scale-105 transition-transform',
  },
});
