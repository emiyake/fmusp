import { tv } from 'tailwind-variants';
export interface LoadingStateDataProps {
  visible?: boolean;
}

export interface LoadingProps {
  visible?: boolean;
  topMost?: boolean;
}

export const style = tv({
  slots: {
    wrapper: 'relative',
    block: 'hidden',
    loading: 'top-0 hidden absolute w-full h-full bg-fixed-white/70 items-center justify-center',
  },
  variants: {
    visible: {
      true: {
        block: 'block',
        loading: 'flex',
      },
    },
    topMost: {
      true: {
        loading: 'fixed',
      },
    },
  },
});
