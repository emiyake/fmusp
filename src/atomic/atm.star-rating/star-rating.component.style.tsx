import { tv } from 'tailwind-variants';

export const style = tv({
  slots: {
    wrapper: 'inline-flex text-primary',
    halfStarWrapper: 'h-xs inline-block leading-0 relative',
    halfStar: 'absolute left-0 top-0',
  },
});
