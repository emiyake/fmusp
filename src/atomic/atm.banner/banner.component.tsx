import { LazyLoadImage } from '@atomic/atm.lazy-load-image';
import type React from 'react';

import type { PropsWithChildren } from 'react';
import { style } from './banner.component.style';

interface BannerProps {
  url: string;
  alt?: string | null;
  className?: string;
}

export const Banner: React.FC<PropsWithChildren<BannerProps>> = props => {
  return (
    <div className={style().wrapper({ className: props.className })}>
      <LazyLoadImage src={props.url} alt={props.alt ?? ''} className={style().image()} />
      {props.children}
    </div>
  );
};
