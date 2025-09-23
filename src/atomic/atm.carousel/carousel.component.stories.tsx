import { Carousel as CarouselComponent, CarouselPager, type CarouselProps } from '@atomic/atm.carousel';

import type { Meta } from '@storybook/react';
import * as React from 'react';

export default {
  title: 'Atomic/Atoms/Carousel',
  component: CarouselComponent,
} as Meta;

export const Carousel: React.FC<Omit<CarouselProps, 'onIndexChanged'>> = props => {
  const [currentPage, setCurrentPage] = React.useState(0);
  return (
    <div>
      <CarouselComponent {...props} onIndexChanged={(index: number) => setCurrentPage(index)}>
        <div style={{ backgroundColor: 'tomato', height: '400px' }}>Frame 1</div>
        <div style={{ backgroundColor: 'orange', height: '300px' }}>Frame 2</div>
        <div style={{ backgroundColor: 'orchid', height: '200px' }}>Frame 3</div>
      </CarouselComponent>
      <CarouselPager current={currentPage} total={3} />
    </div>
  );
};
