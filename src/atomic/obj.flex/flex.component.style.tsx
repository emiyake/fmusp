import type React from 'react';

import { tv, type VariantProps } from 'tailwind-variants';

interface FlexProps {
  children?: React.ReactNode;
  className?: string;
}

const flex = tv({
  base: ['flex flex-1 gap-md'],
  variants: {
    noGrow: { true: 'flex-none' },
    noGap: { true: 'gap-none' },
    row: {
      true: 'flex-row',
      false: 'flex-col',
    },
    hAlign: {
      center: ['[&.flex-row]:justify-center', '[&.flex-col]:items-center'],
      stretch: ['[&.flex-row]:justify-stretch', '[&.flex-col]:items-stretch'],
      between: ['[&.flex-row]:justify-between', '[&.flex-col]:items-between'],
      start: ['[&.flex-row]:justify-start', '[&.flex-col]:items-start'],
      end: ['[&.flex-row]:justify-end', '[&.flex-col]:items-end'],
      initial: ['[&.flex-row]:justify-initial', '[&.flex-col]:items-initial'],
    },
    vAlign: {
      center: ['[&.flex-col]:justify-center', '[&.flex-row]:items-center'],
      stretch: ['[&.flex-col]:justify-stretch', '[&.flex-row]:items-stretch'],
      start: ['[&.flex-col]:justify-start', '[&.flex-row]:items-start'],
      between: ['[&.flex-col]:justify-between', '[&.flex-row]:items-between'],
      end: ['[&.flex-col]:justify-end', '[&.flex-row]:items-end'],
      initial: ['[&.flex-col]:justify-initial', '[&.flex-row]:items-initial'],
    },
  },
});

export type FlexVariants = VariantProps<typeof flex>;

export const Flex: React.FC<FlexProps & FlexVariants> = ({ children, className, row = true, ...props }) => (
  <div className={flex({ row, ...props, className })}>{children}</div>
);
