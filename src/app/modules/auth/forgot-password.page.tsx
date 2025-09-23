import { Button, Form, FormField, Separator, TextInput } from '@atomic';

import * as Validators from '@atomic/obj.form/validators';
import type React from 'react';
import { useLocation } from 'react-router';
import { AuthPageWrapper } from './auth-page-wrapper.component';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPasswordPage: React.FC = () => {
  const { state } = useLocation();
  const email = state?.email ?? '';

  //TODO: int forgot password
  const { mutate, loading } = { mutate: () => null, loading: false };

  const handleSubmit = (_formData: ForgotPasswordFormData) => {
    mutate();
  };

  return (
    <AuthPageWrapper title="Esqueceu sua senha?">
      <Form onSubmit={handleSubmit}>
        <FormField<ForgotPasswordFormData>
          name="email"
          label="E-mail"
          defaultValue={email}
          validators={[Validators.RequiredValidator(), Validators.EmailValidator()]}>
          <TextInput type="email" autoComplete="email" />
        </FormField>
        <Separator />

        <Button variant="primary" type="submit" loading={loading} expanded>
          Enviar
        </Button>
      </Form>
    </AuthPageWrapper>
  );
};

export default ForgotPasswordPage;
