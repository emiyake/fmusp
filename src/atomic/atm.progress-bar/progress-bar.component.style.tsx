import { tv } from 'tailwind-variants';

export const style = tv({
  slots: {
    progressBarWrapper: 'h-xs w-full my-sm rounded-lg bg-cta-soft',
    progressBar: 'h-full rounded-lg bg-cta-strong transition-all duration-300',
    container: 'w-full p-md',
    buttonContainer: 'mt-md flex gap-sm',
  },
  variants: {
    variant: {
      warning: {
        progressBarWrapper: 'bg-feedback-warning-soft',
        progressBar: 'bg-feedback-warning',
      },
      danger: {
        progressBarWrapper: 'bg-feedback-danger-soft',
        progressBar: 'bg-feedback-danger-strong',
      },
      success: {
        progressBarWrapper: 'bg-feedback-success-soft',
        progressBar: 'bg-feedback-success-strong',
      },
    },
  },
});
