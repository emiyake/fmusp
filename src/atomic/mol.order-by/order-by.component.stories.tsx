import type * as React from 'react';

import type { Meta } from '@storybook/react';

import { H4 } from '@atomic/atm.typography';

import { OrderBy as OrderByComponent, OrderByIcons, type OrderByProps } from './order-by.component';

export default {
  title: 'Atomic/Molecules/OrderBy',
  component: OrderByComponent,
  argTypes: {
    order: {
      options: Object.keys(OrderByIcons),
      mapping: Object.keys(OrderByIcons),
      control: {
        type: 'select',
      },
    },
  },
} as Meta;

export const OrderBy: React.FC<OrderByProps> = props => (
  <OrderByComponent order={props.order}>
    <H4>Title</H4>
  </OrderByComponent>
);
