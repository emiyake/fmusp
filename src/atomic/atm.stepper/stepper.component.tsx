import * as React from 'react';

import { type StepperCellProps, _StepperCell } from './stepper-cell.component';
import type { StyleVariants } from './stepper-cell.component.style';

export interface StepperProps {
  step: number;
  children?: React.ReactNode;
}

const _Stepper: React.FC<StepperProps> = props => {
  const status = (step: number, currentStep: number): StyleVariants['status'] => {
    if (step < currentStep) {
      return 'past';
    }
    if (step === currentStep) {
      return 'current';
    }
    return 'future';
  };

  const itens = React.Children.map(props.children, (child: any, i: number) => {
    const key = `ProgressCell_${i}`;
    return React.cloneElement(child, {
      key,
      status: status(i + 1, props.step),
    });
  });

  return <ol className="flex justify-around">{itens}</ol>;
};

export const Stepper: React.FC<StepperProps> & {
  Cell: React.FC<StepperCellProps>;
} = Object.assign(_Stepper, { Cell: _StepperCell });
