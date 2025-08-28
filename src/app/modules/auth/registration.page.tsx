import type React from 'react';

import { TextInput } from '@atomic';
import { Button } from '@atomic/atm.button';
import { Form, FormField } from '@atomic/obj.form';
import * as Validators from '@atomic/obj.form/validators';
import { Separator } from '@atomic/obj.separator';
import { useSearchParams } from 'react-router';
import { AuthPageWrapper } from './auth-page-wrapper.component';

interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
}

const EMAIL_QUERY_PARAM = 'email';

const RegistrationPage: React.FC = () => {
  const [params] = useSearchParams();
  const email = params.get(EMAIL_QUERY_PARAM) ?? '';

  //TODO: int registration
  const { mutate, loading } = { mutate: () => null, loading: false };

  const handleSubmit = (_formData: RegistrationFormData) => {
    mutate();
  };

  return (
    <AuthPageWrapper title="Novo usuário">
      <Form onSubmit={handleSubmit}>
        <FormField<RegistrationFormData> name="name" label="Nome" validators={[Validators.RequiredValidator()]}>
          <TextInput autoComplete="name" />
        </FormField>
        <Separator />

        <FormField<RegistrationFormData>
          name="email"
          label="E-mail"
          defaultValue={email}
          validators={[Validators.RequiredValidator(), Validators.EmailValidator()]}>
          <TextInput type="email" autoComplete="email" disabled={!!email} />
        </FormField>
        <Separator />

        <FormField<RegistrationFormData>
          name="password"
          label="Senha"
          validators={[Validators.RequiredValidator(), ...Validators.PasswordValidators]}>
          <TextInput type="password" autoComplete="new-password" />
        </FormField>
        <Separator />

        <Button variant="primary" type="submit" loading={loading} expanded>
          Cadastrar
        </Button>
      </Form>
    </AuthPageWrapper>
  );
};

export default RegistrationPage;
