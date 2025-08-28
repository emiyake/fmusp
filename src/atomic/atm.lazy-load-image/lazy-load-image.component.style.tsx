import { tv } from 'tailwind-variants';

export const style = tv({
  slots: {
    icon: 'text-neutral text-[32px] absolute top-[50%] mt-[-20px]',
    placeholder: 'w-full bg-neutral-soft text-center relative flex justify-center',
    image: 'block w-full transition-opacity opacity-0 max-h-0 h-auto duration-400',
  },
  variants: {
    loaded: {
      true: {
        image: 'opacity-100 max-h-none',
      },
    },
    round: {
      true: {
        image: 'rounded-xl',
      },
    },
  },
});
