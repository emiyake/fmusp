import * as React from 'react';

import type { Meta } from '@storybook/react';

import { Pagination, type PaginationProps } from './pagination.component';

export default {
  title: 'Atomic/Atoms/Pagination',
  component: Pagination,
  args: {
    current: 1,
    total: 15,
    siblingCount: 2,
  },
} as Meta;

export const PaginationStory: React.FC<PaginationProps> = args => {
  const [current, setCurrent] = React.useState(args.current);
  return <Pagination {...args} current={current} onPageChange={(index: number) => setCurrent(index)} />;
};
