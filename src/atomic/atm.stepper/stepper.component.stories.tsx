import type * as React from 'react';

import type { Meta } from '@storybook/react';

import { Stepper as StepperComponent, type StepperProps } from './stepper.component';

export default {
  title: 'Atomic/Atoms/Stepper',
  component: StepperComponent,
  argTypes: {
    step: {
      control: {
        type: 'number',
        min: 1,
        max: 4,
        step: 1,
      },
    },
  },
} as Meta;

export const Stepper: React.FC<StepperProps> = props => {
  return (
    <StepperComponent {...props}>
      <StepperComponent.Cell number={1} text="Passo 1" />
      <StepperComponent.Cell number={2} text="Passo 2" />
      <StepperComponent.Cell number={3} text="Passo 3" />
      <StepperComponent.Cell number={4} text="Passo 4" />
      <StepperComponent.Cell number={5} text="Passo 5" />
      <StepperComponent.Cell number={6} text="Passo 6" />
    </StepperComponent>
  );
};
