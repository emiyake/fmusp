import { FaIcon } from '@atomic/atm.fa-icon';
import type { FieldStateType } from '@atomic/obj.form/form.model';
import React from 'react';
import { type BaseMask, TextInputMask } from 'react-masked-text';
import { IconButton } from './icon-button.component';
import { style } from './text-input.component.style';

export type AutoCompleteType =
  | 'nope'
  | 'off'
  | 'on'
  | 'name'
  | 'honorific-prefix'
  | 'given-name'
  | 'additional-name'
  | 'family-name'
  | 'honorific-suffix'
  | 'nickname'
  | 'organization-title'
  | 'username'
  | 'new-password'
  | 'current-password'
  | 'organization'
  | 'street-address'
  | 'address-line1'
  | 'address-line2'
  | 'address-line3'
  | 'address-level4'
  | 'address-level3'
  | 'address-level2'
  | 'address-level1'
  | 'country'
  | 'country-name'
  | 'postal-code'
  | 'cc-name'
  | 'cc-given-name'
  | 'cc-additional-name'
  | 'cc-family-name'
  | 'cc-number'
  | 'cc-exp'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-csc'
  | 'cc-type'
  | 'transaction-currency'
  | 'transaction-amount'
  | 'language'
  | 'bday'
  | 'bday-day'
  | 'bday-month'
  | 'bday-year'
  | 'sex'
  | 'url'
  | 'photo'
  | 'tel'
  | 'tel-country-code'
  | 'tel-national'
  | 'tel-area-code'
  | 'tel-local'
  | 'tel-local-prefix'
  | 'tel-local-suffix'
  | 'tel-extension'
  | 'email'
  | 'impp';

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>, FieldStateType {
  invalid?: boolean;
  disabled?: boolean;
  mask?: BaseMask;
  icon?: React.ReactNode;
  dismissable?: boolean;
  initialValue?: string | number | string[];
  value?: string | number | string[];
  // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill-processing-model
  autoComplete?: AutoCompleteType;
  onChange?: (eventOrValue: string | React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TextInputState {
  value?: string | number | string[];
  showPassword: boolean;
}

export const TextInput = React.forwardRef(
  (
    { icon, mask, disabled, dismissable, invalid, className, type, onChange, ...props }: TextInputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const val = props.value as string;

    const handleDismiss = () => {
      onChange?.('');
    };

    const getType = () => {
      if (type === 'password') {
        return showPassword ? 'text' : 'password';
      }

      return type;
    };

    const getAutocomplete = () => {
      if (type === 'password' && showPassword) {
        return 'off';
      }

      return props.autoComplete;
    };

    const iconButton = (() => {
      if (disabled) {
        return null;
      }
      if (dismissable && !!val.length) {
        return (
          <IconButton onClick={handleDismiss} title="Limpar">
            <FaIcon.Close />
          </IconButton>
        );
      }
      if (type === 'password') {
        return showPassword ? (
          <IconButton onClick={() => setShowPassword(false)} title="Esconder senha">
            <FaIcon.PasswordHide />
          </IconButton>
        ) : (
          <IconButton onClick={() => setShowPassword(true)} title="Mostrar senha">
            <FaIcon.PasswordShow />
          </IconButton>
        );
      }
      return null;
    })();

    return (
      <div className="relative">
        {!!icon && <div className={style().icon()}>{icon}</div>}
        <TextInputMask
          className={style().field({
            icon: !!icon,
            invalid,
            className,
          })}
          mask={mask}
          autoComplete={getAutocomplete()}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(e);
          }}
          disabled={disabled}
          type={getType()}
          {...props}
          ref={ref}
        />
        {iconButton}
      </div>
    );
  },
);

TextInput.displayName = 'TextInput';
