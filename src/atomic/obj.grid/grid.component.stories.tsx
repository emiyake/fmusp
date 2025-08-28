import type * as React from 'react';

import type { Meta } from '@storybook/react';

import { H2 } from '@atomic/atm.typography';
import { Col, Row } from '@atomic/obj.grid';

export default {
  title: 'Atomic/Objects/Grid',
} as Meta;

export const Grid: React.FC = () => (
  <>
    <H2>Grid 12 cols (default)</H2>
    <Row>
      <Col xs={12} md={4} className="bg-neutral-soft">
        xs={12} md={4}
      </Col>
      <Col xs={12} md={4} className="bg-neutral-soft">
        xs={12} md={4}
      </Col>
    </Row>
    <H2>Grid 12 cols ommiting XS (xs has 12 cols span)</H2>
    <Row>
      <Col md={4} className="bg-neutral-soft">
        md={4}
      </Col>
      <Col md={4} className="bg-neutral-soft">
        md={4}
      </Col>
    </Row>
    <H2>Grid auto cols</H2>
    <Row cols="auto">
      <Col className="bg-neutral-soft">1</Col>
      <Col className="bg-neutral-soft">2</Col>
    </Row>
    <H2>Grid 8 cols</H2>
    <Row cols={8}>
      <Col xs={3} className="bg-neutral-soft">
        xs={3}
      </Col>
      <Col xs={2} md={5} className="bg-neutral-soft">
        xs={2} md={5}
      </Col>
    </Row>
    <H2>Grid no Gutter</H2>
    <Row noGutter cols="auto">
      <Col className="bg-neutral-soft">Col 1/3</Col>
      <Col className="bg-neutral-soft">
        <span>Col 2/3</span>
      </Col>
      <Col className="bg-neutral-soft">Col 3/3</Col>
    </Row>
    <H2>Grid auto cols</H2>
    <Row cols="auto">
      <div>Col 1/3</div>
      <div>Col 2/3</div>
      <div>Col 3/3</div>
    </Row>
    <H2>Grid partially set cols </H2>
    <Row>
      <Col xs={6} className="bg-neutral-soft">
        Col xs={6}
      </Col>
      <div>Col 1/12</div>
      <div>Col 1/12</div>
    </Row>
  </>
);
