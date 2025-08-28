import { type VariantProps, tv } from 'tailwind-variants';

export const chipStyle = tv({
  slots: {
    base: 'inline-flex items-center justify-center rounded-md px-sm py-xs text-sm font-regular font-primary transition-all outline outline-1 outline-fixed-black gap-xs',
    icon: 'mr-sm -ml-xs',
  },
  variants: {
    variant: {
      default: {
        base: 'bg-neutral-xxsoft hover:bg-neutral-soft',
      },
      primary: {
        base: 'bg-primary hover:bg-primary-soft',
      },
      secondary: {
        base: 'bg-secondary text-neutral-xxsoft hover:bg-secondary-soft',
      },
      success: {
        base: 'bg-feedback-success hover:bg-feedback-success-strong text-neutral-xxsoft',
      },
      danger: {
        base: 'bg-feedback-danger hover:bg-feedback-danger-strong text-neutral-xxsoft',
      },
      warning: {
        base: 'bg-feedback-warning hover:bg-feedback-warning-strong text-neutral-xxsoft',
      },
    },
    size: {
      sm: {
        base: 'text-xs p-xs',
      },
      md: {
        base: 'text-sm p-sm',
      },
      lg: {
        base: 'text-base p-md',
      },
    },
    disabled: {
      true: {
        base: 'opacity-50 cursor-not-allowed pointer-events-none',
      },
      false: {
        base: '',
      },
    },
    selected: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    { variant: 'default', selected: true, class: 'bg-neutral-strong text-neutral-xxsoft hover:bg-neutral' },
    { variant: 'primary', selected: true, class: 'bg-primary-strong text-neutral-xxsoft' },
    { variant: 'secondary', selected: true, class: 'bg-secondary-strong' },
    { variant: 'success', selected: true, class: 'bg-feedback-success-strong' },
    { variant: 'danger', selected: true, class: 'bg-feedback-danger-strong' },
    { variant: 'warning', selected: true, class: 'bg-feedback-warning-strong hover:bg-feedback-warning' },
  ],
  defaultVariants: {
    variant: 'default',
    size: 'md',
    selected: false,
    disabled: false,
  },
});

export type ChipStyleVariants = VariantProps<typeof chipStyle>;
