import type React from 'react';

import { useNavigateToNextRoute } from '@app/core/route/navigate-to-next-route.hook';
import { sendAnalyticsEvent } from '@app/domain/analytics';
import { useLogin } from '@app/domain/login/login.use-case';
import { AnalyticsEvent } from '@app/model';
import { Button, LinkButton, Separator, TextInput } from '@atomic';
import { Flex } from '@atomic/obj.flex';
import { Form, FormField } from '@atomic/obj.form';
import { useFormFieldWatch } from '@atomic/obj.form/hook/form-field-watch.hook';
import * as Validators from '@atomic/obj.form/validators';
import { useNavigate } from 'react-router';
import { AuthPageWrapper } from './auth-page-wrapper.component';
import { AuthRoutes } from './auth.routes';

interface LoginFormData {
  email: string;
  password: string;
}

const DEV_EMAIL = 'user.taqtile.1@taqtile.com.br';
const DEV_PASSWORD = '1234qwer';

const LoginPage: React.FC = () => {
  const { navigateToNextRoute } = useNavigateToNextRoute();
  const navigate = useNavigate();

  const { login, loading } = useLogin({
    onCompleted: () => {
      sendAnalyticsEvent(AnalyticsEvent.Login);
      navigateToNextRoute();
    },
  });

  const handleSubmit = (data: LoginFormData) => {
    if (import.meta.env.DEV) {
      console.warn('login.page.tsx. Bypassing login. Remove this in the project');
      navigate('/');
      return;
    }

    login({ data });
  };

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
