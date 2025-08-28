import type * as React from 'react';

import { FaIcon } from '@atomic/atm.fa-icon';
import { Body } from '@atomic/atm.typography';

import { type StyleVariants, style } from './stepper-cell.component.style';

export interface StepperCellProps extends StyleVariants {
  number: number;
  text: string;
}

export const _StepperCell: React.FC<StepperCellProps> = props => {
  const { wrapper, badge, check, number, caption } = style({
    status: props.status,
  });

  return (
    <li className={wrapper()} aria-current={props.status === 'current' ? 'step' : undefined}>
      <span className={badge()} aria-hidden="true">
        <FaIcon.Check className={check()} />
        <Body className={number()}>{props.number}</Body>
      </span>
      <Body className={caption()}>{props.text}</Body>
    </li>
  );
};
