import { tv, type VariantProps } from 'tailwind-variants';

export const style = tv({
  slots: {
    wrapper: [
      'flex flex-col w-full relative',
      "[&+&:before]:relative [&+&:before]:top-[18px] [&+&:before]:left-[-50%] [&+&:before]:z-0 [&+&:before]:inline-block [&+&:before]:w-full [&+&:before]:h-[2px] [&+&:before]:bg-neutral-soft [&+&:before]:content-['']", // line style
    ],
    badge: [
      'h-xl w-xl rounded-[16px] border border-fixed-transparent bg-neutral-xxsoft text-primary justify-center flex flex-col self-center z-1',
    ],
    check: 'text-fixed-white hidden self-center',
    number: 'text-center text-primary',
    caption: 'text-neutral text-center mt-sm text-xs',
  },
  variants: {
    status: {
      past: {
        wrapper: '[&+&:before]:bg-feedback-success',
        badge: 'bg-primary text-fixed-white',
        check: 'block',
        number: 'hidden',
        caption: 'text-primary',
      },
      current: {
        wrapper: 'before:bg-feedback-success',
        badge: 'bg-primary text-fixed-white',
        number: 'text-fixed-white',
        caption: 'text-primary',
      },
      future: {
        wrapper: ':before:bg-neutral-soft',
        badge: 'border-primary',
      },
    },
  },
});

export type StyleVariants = VariantProps<typeof style>;
