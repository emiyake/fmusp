import { H2 } from '@atomic/atm.typography';
import { Col, Grid, Row } from '@atomic/obj.grid';
import type { Meta } from '@storybook/react';
import type * as React from 'react';

import { SwitchCell } from './switch-cell.component';

export default {
  title: 'Atomic/Molecules/SwitchCell',
  argTypes: {
    title: { control: { type: 'text' } },
    onChange: { action: 'onChange' },
  },
} as Meta;

interface SwitchCellStoryProps {
  title: string;
  onChange: (checked: boolean) => void;
}

export const Default: React.FC<SwitchCellStoryProps> = props => (
  <Grid>
    <Row>
      <Col sm={12}>
        {props.title && <H2>Switch cell</H2>}
        <SwitchCell title={props.title ?? 'Toggle switch'} onChange={props.onChange} />
      </Col>
    </Row>
  </Grid>
);
