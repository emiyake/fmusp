import { tv } from 'tailwind-variants';

export const style = tv({
  base: [
    'bg-background p-md rounded-md text-sm',
    '[&>.key]:text-neutral-xstrong',
    '[&>.number]:text-[#090]',
    '[&>.string]:text-primary',
  ],
});
