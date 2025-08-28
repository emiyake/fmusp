import type * as React from 'react';

import type { Meta } from '@storybook/react';

import Logo from '@assets/img/img_logo.png';
import { H2, H3 } from '@atomic/atm.typography';
import { Col, Grid, Row } from '@atomic/obj.grid';

import { LazyLoadImage as LazyLoadImageComponent, type LazyLoadImageProps } from './lazy-load-image.component';

export default {
  title: 'Atomic/Atoms/Lazy Load Image',
  component: LazyLoadImageComponent,
} as Meta;

export const LazyLoadImage: React.FC<LazyLoadImageProps> = props => (
  <Grid fluid>
    <H2>LazyLoadImage</H2>
    <Row>
      <Col xs={6}>
        <LazyLoadImageComponent aspectRatio={props.aspectRatio} round={props.round} src={Logo} />
      </Col>
      <Col xs={6}>
        <LazyLoadImageComponent aspectRatio={9 / 16} src={Logo} />
      </Col>
      <Col xs={6}>
        <H3>Error</H3>
        <LazyLoadImageComponent aspectRatio={9 / 16} src={'./'} />
      </Col>
    </Row>
  </Grid>
);
