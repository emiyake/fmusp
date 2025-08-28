import { H2 } from '@atomic/atm.typography';

import { Form, FormField } from '@atomic/obj.form';
import { StepperInput, type StepperInputProps } from './stepper-input.component';

export default {
  title: 'Atomic/Atoms/StepperInput',
  component: StepperInput,
  argTypes: {
    maxValue: { control: { type: 'number', min: 1, step: 1 } },
    minValue: { control: { type: 'number', min: 1, step: 1 } },
    onClick: { action: 'submit' },
  },
};

export const Controlled: React.FC<StepperInputProps> = props => {
  return (
    <Form onSubmit={console.log}>
      <H2>Controlled</H2>

      <FormField name="stepper" defaultValue={1} label="Stepper input with FormField wrapper">
        <StepperInput maxValue={props.maxValue ?? 5} minValue={props.minValue ?? 1} />
      </FormField>
    </Form>
  );
};
