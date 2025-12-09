import { useNavigateToNextRoute } from '@app/core/route/navigate-to-next-route.hook';
import { sendAnalyticsEvent } from '@app/domain/analytics';
import { AnalyticsEvent } from '@app/model';
import { useLogin } from '@app/modules/auth/use-login';
import { Button, Flex, Form, FormField, LinkButton, Separator, TextInput } from '@atomic';

import { useFormFieldWatch } from '@atomic/obj.form/hook/form-field-watch.hook';
import * as Validators from '@atomic/obj.form/validators';
import React from 'react';
import { AuthRoutes } from './auth.routes';
import { AuthPageWrapper } from './auth-page-wrapper.component';

interface LoginFormData {
  email: string;
  password: string;
}

const DEV_EMAIL = 'dweg0@icloud.com';
const DEV_PASSWORD = '12345678';

const LoginPage: React.FC = () => {
  const { navigateToNextRoute } = useNavigateToNextRoute();

  const { login, loading, data } = useLogin();

  const handleSubmit = (data: LoginFormData) => {
    login(data.email, data.password);
  };

  React.useEffect(() => {
    if (data?.user) {
      sendAnalyticsEvent(AnalyticsEvent.Login);
      navigateToNextRoute();
    }
  }, [data, navigateToNextRoute]);

  return (
    <AuthPageWrapper title="Login">
      <Form onSubmit={handleSubmit}>
        <LoginFields />
        <Button loading={loading} variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </AuthPageWrapper>
  );
};

export default LoginPage;

const LoginFields = () => {
  const emailValue = useFormFieldWatch<LoginFormData>('email');

  return (
    <>
      <FormField<LoginFormData>
        name="email"
        label="E-mail"
        validators={[Validators.RequiredValidator(), Validators.EmailValidator()]}
        defaultValue={import.meta.env.DEV ? DEV_EMAIL : ''}>
        <TextInput type="email" />
      </FormField>
      <Separator />

      <FormField<LoginFormData>
        name="password"
        label="Password"
        validators={[Validators.RequiredValidator()]}
        defaultValue={import.meta.env.DEV ? DEV_PASSWORD : ''}>
        <TextInput type="password" />
      </FormField>

      <Flex hAlign="end">
        <LinkButton variant="primary" link to={AuthRoutes.ForgotPassword} state={{ email: emailValue }}>
          Esqueceu sua senha?
        </LinkButton>
      </Flex>
      <Separator />
    </>
  );
};
