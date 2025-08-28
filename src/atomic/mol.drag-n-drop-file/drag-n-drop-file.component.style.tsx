import { tv } from 'tailwind-variants';

export const style = tv({
  slots: {
    wrapper: 'relative',
    overlay:
      'border-dashed border border-neutral bg-neutral-soft absolute top-0 bottom-0 left-0 right-0 z-4 flex items-center justify-center',
    message: 'text-black text-lg font-bold',
  },
});
