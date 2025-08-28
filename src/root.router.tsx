import type React from 'react';
import { Suspense } from 'react';

import { Navigate, Route, Routes, useLocation } from 'react-router';

import { GuardElement } from '@app/core/route/guard-element.component';
import { LazyForgotPasswordPage, LazyLoginPage, LazyRegistrationPage, LazyResetPasswordPage } from '@app/modules/auth';
import { AuthRoutes } from '@app/modules/auth/auth.routes';
import { LazyHomePage } from '@app/modules/home';
import { HomeRoutes } from '@app/modules/home/home.routes';
import { Layout } from '@app/modules/layout/layout.component';
import type { MenuLink } from '@app/modules/layout/menu.component';
import { useAuthorized } from '@app/route-guard/useAuthGuard.hook';
import { SampleRoutes, sampleMenuLinks } from '@atomic-samples/sample.routes';
import { ActivityIndicator } from '@atomic/atm.activity-indicator';
import { FaIcon } from '@atomic/atm.fa-icon';

export const links: MenuLink[] = [{ to: HomeRoutes.Base, content: 'Home', icon: <FaIcon.Home /> }];

export const RootRouter: React.FC = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<ActivityIndicator type="circle" />}>
      <Routes location={location}>
        <Route path={AuthRoutes.Login} element={<LazyLoginPage />} />
        <Route path={AuthRoutes.Registration} element={<LazyRegistrationPage />} />
        <Route path={AuthRoutes.ForgotPassword} element={<LazyForgotPasswordPage />} />
        <Route path={AuthRoutes.ResetPassword} element={<LazyResetPasswordPage />} />

        <Route
          path={AuthRoutes.Guard}
          element={<GuardElement sendPreviousPath redirectPath={AuthRoutes.Login} useGuard={useAuthorized} />}>
          <Route element={<Layout links={links} />}>
            <Route path="*" element={<div>Authenticated page</div>} />
          </Route>
        </Route>

        <Route path={'/'} element={<Layout links={[...links, ...sampleMenuLinks]} />}>
          <Route index element={<Navigate to={HomeRoutes.Base} />} />
          <Route path={HomeRoutes.Base} element={<LazyHomePage />} />

          {SampleRoutes}
        </Route>
      </Routes>
    </Suspense>
  );
};
