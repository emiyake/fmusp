import { FaIcon } from '@atomic/atm.fa-icon';
import type { FieldStateType } from '@atomic/obj.form';
import * as React from 'react';
import { style } from './radio-input.component.style';

interface RadioInputProps extends FieldStateType, React.InputHTMLAttributes<HTMLInputElement> {
  /** Option id */
  radioId: string;
  children?: React.ReactNode;
}

export const RadioInput = React.forwardRef<HTMLInputElement, RadioInputProps>((props, ref) => {
  const { radioId, value, children, invalid: _invalid, checked: _checked, onChange, ...rest } = props;

  const isControlled = () => value !== undefined;

  const handlePress = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
  };

  return (
    <label className={style().wrapper({ disabled: props.disabled })}>
      <div className="relative">
        <input
          type="radio"
          checked={isControlled() ? value === radioId : undefined}
          value={radioId}
          className={style().bullet()}
          onChange={handlePress}
          {...rest}
          ref={ref}
        />
        <FaIcon.CircleFill aria-hidden="true" className={style().checked()} />
        <FaIcon.Circle aria-hidden="true" className={style().unchecked()} />
      </div>
      <div className={style().value({ disabled: props.disabled })}>{children}</div>
    </label>
  );
});

RadioInput.displayName = 'RadioInput';
