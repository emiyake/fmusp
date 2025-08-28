import * as React from 'react';

import { FaIcon } from '@atomic/atm.fa-icon';
import type { FieldStateType } from '@atomic/obj.form/form.model';
import { style } from './select-input.component.style';

export interface SelectProps extends FieldStateType, React.InputHTMLAttributes<HTMLSelectElement> {}

export const SelectInput = React.forwardRef((props: SelectProps, ref: React.ForwardedRef<HTMLSelectElement>) => {
  const { type, invalid, className, children, ...other } = props;

  return (
    <div
      className={style().border({
        invalid,
        className,
      })}>
      <select className={style().select({ invalid: props.invalid })} {...other} ref={ref}>
        {children}
      </select>
      <FaIcon.ArrowDropDown className={style().icon()} />
    </div>
  );
});

SelectInput.displayName = 'SelectInput';
