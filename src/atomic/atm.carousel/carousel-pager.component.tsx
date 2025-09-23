import type * as React from 'react';

import { pager } from './carousel-pager.component.style';

export interface CarouselPagerProps {
  total: number;
  current: number;
}

export const CarouselPager: React.FC<CarouselPagerProps> = props => {
  return (
    <div className="text-center">
      {new Array(props.total).fill(undefined).map((_i, index: number) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: Intentional
          key={`name${index}`}
          className={pager({ active: index === props.current })}
        />
      ))}
    </div>
  );
};
