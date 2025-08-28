import type * as React from 'react';

import { InfiniteScrollLoadingRow } from './infinite-scroll-loading-row.component';

export default {
  title: 'Samples/Molecules/Infinite Scroll Loading Row',
  component: InfiniteScrollLoadingRow,
};

export const InfiniteScroll: React.FC = () => <InfiniteScrollLoadingRow isVisible />;
