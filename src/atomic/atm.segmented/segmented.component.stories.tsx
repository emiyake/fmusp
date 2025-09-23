import type { Meta } from '@storybook/react';
import type * as React from 'react';

import { Segmented as SegmentedComponent } from './segmented.component';

export default {
  title: 'Atomic/Atoms/Segmented',
} as Meta;

export const Segmented: React.FC = () => {
  return (
    <SegmentedComponent>
      <SegmentedComponent.Item>Segment 1</SegmentedComponent.Item>
      <SegmentedComponent.Item>Segment 2</SegmentedComponent.Item>
      <SegmentedComponent.Item>Segment 3</SegmentedComponent.Item>
    </SegmentedComponent>
  );
};
