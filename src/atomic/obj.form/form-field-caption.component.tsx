import { InputCaption } from '@atomic/atm.typography';
import type * as React from 'react';
import type { FieldError } from 'react-hook-form';

interface FormFieldCaptionProps {
  error?: FieldError;
}

export const FormFieldCaption: React.FC<FormFieldCaptionProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  const message = String(error.message);

  return <InputCaption hasError>{message}</InputCaption>;
};
