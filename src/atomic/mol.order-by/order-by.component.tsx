import { FaIcon } from '@atomic/atm.fa-icon';
import { Flex } from '@atomic/obj.flex';
import type * as React from 'react';

import type { IconType } from 'react-icons';
import { icon, wrapper } from './order-by.component.style';

export const OrderByIcons: { [key: string]: IconType } = {
  asc: FaIcon.SortAsc,
  desc: FaIcon.SortDesc,
  none: FaIcon.SortUpDown,
};

export type OrderByType = keyof typeof OrderByIcons;

export interface OrderByProps {
  order?: OrderByType;
  onTap?: () => any;
  children?: React.ReactNode;
  className?: string;
}

export const OrderBy: React.FC<OrderByProps> = props => {
  const handleClick = () => {
    props.onTap?.();
  };

  const Icon = OrderByIcons[props.order || 'none'];

  return (
    <button className={wrapper({ className: props.className })} onClick={handleClick} type="button">
      <Flex className="gap-sm">
        <Flex noGrow>{props.children}</Flex>
        <Flex noGrow vAlign="center">
          <Icon className={icon({ order: props.order !== undefined && props.order !== 'none' })} />
        </Flex>
      </Flex>
    </button>
  );
};
