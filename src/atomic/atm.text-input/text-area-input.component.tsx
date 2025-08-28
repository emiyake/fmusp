import type { FieldStateType } from '@atomic/obj.form/form.model';
import * as React from 'react';
import { style } from './text-area-input.component.style';

export interface TextAreaFieldProps extends FieldStateType, React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextAreaInput = React.forwardRef(
  ({ invalid, className, ...props }: TextAreaFieldProps, ref: React.ForwardedRef<HTMLTextAreaElement>) => {
    return (
      <textarea
        className={style({
          invalid,
          className,
        })}
        {...props}
        ref={ref}
      />
    );
  },
);

TextAreaInput.displayName = 'TextAreaInput';
