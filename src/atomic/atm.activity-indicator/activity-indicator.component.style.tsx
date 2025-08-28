import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const style = tv({
  base: ['text-inherit inline-block animate-spin mx-sm'],
});
export type StyleVariants = VariantProps<typeof style>;
