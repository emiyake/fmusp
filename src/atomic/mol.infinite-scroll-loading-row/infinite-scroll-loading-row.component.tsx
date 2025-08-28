import type * as React from 'react';

import { ActivityIndicator } from '@atomic/atm.activity-indicator';
import { Flex } from '@atomic/obj.flex';
import { ScrollListener } from '@atomic/obj.scroll-listener';

export interface InfiniteScrollLoadingRowProps {
  isVisible: boolean;
  onAchieveEndOfScroll?: () => void;
}

export const InfiniteScrollLoadingRow: React.FC<InfiniteScrollLoadingRowProps> = props => {
  return (
    <>
      <ScrollListener onAchieveEndOfScroll={props.onAchieveEndOfScroll} />
      {props.isVisible && (
        <Flex className="content-center">
          <ActivityIndicator type="circle" />
        </Flex>
      )}
    </>
  );
};
