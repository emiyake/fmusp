import * as React from 'react';

import { type StyleVariants, style } from './switch-input.component.style';

export interface SwitchProps extends StyleVariants {
  onChange?: (checked: boolean, id: number, event: any) => void;
  id: number;
  value?: boolean;
  ariaLabel: string;
}

export const SwitchInput = React.forwardRef<HTMLInputElement, SwitchProps>((props, _ref) => {
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    setChecked(props.value ?? false);
  }, [props.value]);

  const handleClick = (event: any) => {
    const { onChange, id } = props;

    onChange?.(!checked, id, event);
    setChecked(prev => !prev);
  };

  return (
    <span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={props.ariaLabel}
        disabled={props.disabled}
        className={style().wrapper()}
        onClick={handleClick}>
        <div className={style().bg({ checked, disabled: props.disabled })}>&nbsp;</div>
        <div className={style().handle({ checked, disabled: props.disabled })} />
      </button>
    </span>
  );
});

SwitchInput.displayName = 'SwitchInput';
