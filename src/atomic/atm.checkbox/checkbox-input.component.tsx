import * as React from 'react';

import { FaIcon } from '@atomic/atm.fa-icon';
import type { FieldStateType } from '@atomic/obj.form';
import { type StyleVariants, style } from './checkbox-input.component.style';

export interface CheckboxInputProps extends FieldStateType, StyleVariants, React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  /** Controlled value */
  value?: string[];
  onChange?: (eventOrValue: React.ChangeEvent<HTMLInputElement> | string[]) => void;
  /** Option id */
  checkboxId: string;
}

export const CheckboxInput = React.forwardRef<HTMLInputElement, CheckboxInputProps>((props, ref) => {
  const { children, checkboxId, value, onChange, invalid, ...rest } = props;

  const isControlled = () => value !== undefined;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled()) {
      onChange?.(event);
      return;
    }

    const { checked } = event.target;
    const newValue = checked ? [...(value ?? []), checkboxId] : (value ?? []).filter(val => val !== checkboxId);

    onChange?.(newValue);
  };

  return (
    <label className={style().wrapper({ disabled: props.disabled })}>
      <div className="relative">
        <input
          type="checkbox"
          checked={isControlled() ? value?.includes(checkboxId) : undefined}
          className={style().bullet()}
          {...rest}
          value={checkboxId}
          onChange={handleChange}
          ref={ref}
        />
        <FaIcon.CheckboxEmpty aria-hidden="true" className={style().checked()} />
        <FaIcon.CheckboxFill aria-hidden="true" className={style().unchecked()} />
      </div>
      <div className={style().value({ disabled: props.disabled })}>{children}</div>
    </label>
  );
});

CheckboxInput.displayName = 'CheckboxInput';
