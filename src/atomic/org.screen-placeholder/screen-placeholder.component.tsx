import { LazyLoadImage } from '@atomic/atm.lazy-load-image';
import { Body, H3 } from '@atomic/atm.typography';
import { Col, Grid } from '@atomic/obj.grid';
import type * as React from 'react';

export interface ScreenPlaceholderProps {
  src: string;
  title: string;
  message: string;
  children?: React.ReactNode;
}

export const ScreenPlaceholder: React.FC<ScreenPlaceholderProps> = props => (
  <div className="text-center">
    <div className="mx-auto my-md h-[225px] w-[225px]">
      <LazyLoadImage src={props.src} aspectRatio={1} />
    </div>
    <Grid>
      <Col sm={12}>
        <H3>{props.title}</H3>
        <Body>{props.message}</Body>
      </Col>
    </Grid>
    <Grid>
      <Col sm={12}>{props.children}</Col>
    </Grid>
  </div>
);
