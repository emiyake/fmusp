import { tv, type VariantProps } from 'tailwind-variants';

export const style = tv({
  slots: {
    fade: 'transition-opacity opacity-0 delay-100 duration-300',
    wrapper: 'rounded-md py-md px-sm font-primary text-sm',
    content: 'brightness-50 mx-sm flex dark:brightness-100',
    icon: 'mt-[2px] mr-sm self-center text-[20px]',
    close: 'w-md h-md cursor-pointer',
  },
  variants: {
    type: {
      warning: {
        wrapper: 'text-feedback-warning bg-feedback-warning/10',
      },
      success: {
        wrapper: 'text-feedback-success bg-feedback-success/10',
      },
      info: {
        wrapper: 'text-feedback-info bg-feedback-info/10',
      },
      danger: {
        wrapper: 'text-feedback-danger bg-feedback-danger/10',
      },
    },
    visible: {
      true: {
        fade: 'opacity-100',
      },
      false: {
        fade: 'opacity-0',
      },
    },
  },
});

export type StyleVariants = VariantProps<typeof style>;
