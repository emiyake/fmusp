import type * as React from 'react';

import { SwitchInput } from '@atomic/atm.switch';
import { H3 } from '@atomic/atm.typography';
import { Flex } from '@atomic/obj.flex';

export interface SwitchCellProps {
  title: string;
  id?: number;
  onChange?: (checked: boolean) => void;
  checked?: boolean;
}

export const SwitchCell: React.FC<SwitchCellProps> = props => {
  return (
    <Flex>
      <Flex vAlign="center">
        <H3>{props.title}</H3>
      </Flex>
      <Flex vAlign="center" noGrow>
        <SwitchInput checked={props.checked} onChange={props.onChange} id={props.id ?? 0} ariaLabel={props.title} />
      </Flex>
    </Flex>
  );
};
