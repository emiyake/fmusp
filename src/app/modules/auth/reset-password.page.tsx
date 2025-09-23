import { TextInput } from '@atomic';
import { Button } from '@atomic/atm.button';
import { Form, FormField } from '@atomic/obj.form';
import * as Validators from '@atomic/obj.form/validators';
import { Separator } from '@atomic/obj.separator';
import type React from 'react';
import { AuthPageWrapper } from './auth-page-wrapper.component';

interface ResetPasswordFormData {
  newPassword: string;
}

const ResetPasswordPage: React.FC = () => {
  //TODO: int reset password
  const { mutate, loading } = { mutate: () => null, loading: false };

  const handleSubmit = (_formData: ResetPasswordFormData) => {
    mutate();
  };

  return (
    <AuthPageWrapper title="Recuperar a senha">
      <Form onSubmit={handleSubmit}>
        <FormField<ResetPasswordFormData>
          name="newPassword"
          label="Nova senha"
          validators={[Validators.RequiredValidator(), ...Validators.PasswordValidators]}>
          <TextInput type="password" autoComplete="new-password" />
        </FormField>
        <Separator />

        <Button variant="primary" type="submit" loading={loading} expanded>
          Recuperar
        </Button>
      </Form>
    </AuthPageWrapper>
  );
};

export default ResetPasswordPage;
