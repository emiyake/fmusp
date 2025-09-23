import { FaIcon } from '@atomic/atm.fa-icon';
import { BodySecondary, InputValue } from '@atomic/atm.typography';
import { Flex } from '@atomic/obj.flex';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { stepperInputStrings } from './stepper-input.component.strings';
import { style } from './stepper-input.component.style';

const strings = stepperInputStrings.stepperInput;

export interface StepperInputProps {
  unit?: string;
  value?: number;
  caption?: string;
  initialValue?: number;
  minValue?: number;
  maxValue?: number;
  outlined?: boolean;
  onChange?: (newValue: number) => void;
}

export const StepperInput = React.forwardRef<HTMLInputElement, StepperInputProps>((props, _ref) => {
  const [value, setValue] = useState(props.initialValue ?? props.value ?? props.minValue ?? 0);

  useEffect(() => {
    if (props.initialValue !== undefined && props.value !== undefined) {
      throw new Error('Use either the initialValue prop, or the value prop, but not both');
    }
  }, [props.initialValue, props.value]);

  const getCurrentValue = () => {
    return props.value ?? value;
  };

  const handleMinusClick = () => {
    const currentValue = getCurrentValue();
    const nextValue = Math.max(currentValue - 1, props.minValue ?? Number.NEGATIVE_INFINITY);
    changeValue(nextValue);
  };

  const handlePlusClick = () => {
    const currentValue = getCurrentValue();
    const nextValue = Math.min(currentValue + 1, props.maxValue ?? Number.POSITIVE_INFINITY);
    changeValue(nextValue);
  };

  const changeValue = (nextValue: number) => {
    props.onChange?.(nextValue);

    if (!isControlled()) {
      setValue(nextValue);
    }
  };

  const isControlled = () => {
    return props.value !== undefined;
  };

  const val = getCurrentValue();
  return (
    <Flex className={style().wrapper()}>
      <Flex hAlign="end" noGrow>
        <button
          type="button"
          aria-label={strings.decreaseQuantity}
          className={style().button({ disabled: val === props.minValue, outlined: props.outlined })}
          onClick={handleMinusClick}>
          <FaIcon.StepperMinus />
        </button>
      </Flex>
      <Flex hAlign="center" vAlign="center" row={false}>
        <InputValue>
          {val} {props.unit}
        </InputValue>
        {!!props.caption && <BodySecondary>{props.caption}</BodySecondary>}
      </Flex>
      <Flex hAlign="start" noGrow>
        <button
          type="button"
          aria-label={strings.increaseQuantity}
          className={style().button({ disabled: val === props.maxValue, outlined: props.outlined })}
          onClick={handlePlusClick}>
          <FaIcon.StepperPlus />
        </button>
      </Flex>
    </Flex>
  );
});

StepperInput.displayName = 'StepperInput';
