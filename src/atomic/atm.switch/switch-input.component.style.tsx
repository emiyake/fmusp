import { tv, type VariantProps } from 'tailwind-variants';

export const style = tv({
  slots: {
    wrapper: 'inline-block relative rounded-[14px] text-left select-none touch-none disabled:opacity-50',
    bg: 'relative w-[56px] h-[28px] bg-neutral-strong rounded-[14px] cursor-pointer',
    handle: [
      'inline-block absolute top-px h-[26px] w-[26px] outline-0 bg-neutral-xxsoft border-0 rounded-[50%] cursor-pointer',
      'transition-[background-color,transform] translate-x-px',
    ],
  },
  variants: {
    disabled: {
      true: {
        bg: 'cursor-default',
        handle: 'cursor-default',
      },
    },
    checked: {
      true: {
        bg: 'bg-accessory',
        handle: 'translate-x-[28px]',
      },
    },
  },
});

export type StyleVariants = VariantProps<typeof style>;
