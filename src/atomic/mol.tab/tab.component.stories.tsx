import { H2 } from '@atomic/atm.typography';
import { Col, Grid, Row } from '@atomic/obj.grid';
import type { Meta } from '@storybook/react';
import type * as React from 'react';

import { Tab } from './tab.component';

export default {
  title: 'Atomic/Molecules/Tab',
  component: Tab,
  argTypes: {
    full: { control: { type: 'boolean' } },
  },
} as Meta;

export const TabBar: React.FC<any> = props => (
  <Grid fluid>
    <Row>
      <Col sm={8}>
        <H2>Link Tab</H2>
        <Tab initialIndex={1} full={props.full}>
          <Tab.LinkItem>LinkItem 1</Tab.LinkItem>
          <Tab.LinkItem>LinkItem 2</Tab.LinkItem>
          <Tab.LinkItem>LinkItem 3</Tab.LinkItem>
        </Tab>
      </Col>
    </Row>

    <Row>
      <Col sm={8}>
        <H2>Box Tab</H2>
        <Tab initialIndex={1} full={props.full}>
          <Tab.BoxItem>BoxItem 1</Tab.BoxItem>
          <Tab.BoxItem>BoxItem 2</Tab.BoxItem>
          <Tab.BoxItem>BoxItem 3</Tab.BoxItem>
        </Tab>
      </Col>
    </Row>
  </Grid>
);
