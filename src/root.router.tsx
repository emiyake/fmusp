import { GuardElement } from '@app/core/route/guard-element.component';
import { LazyForgotPasswordPage, LazyLoginPage, LazyRegistrationPage, LazyResetPasswordPage } from '@app/modules/auth';
import { AuthRoutes } from '@app/modules/auth/auth.routes';
import { FormDetailPage, FormListPage } from '@app/modules/form';
import { FormRoute } from '@app/modules/form/form.routes';
import { Layout } from '@app/modules/layout/layout.component';
import type { MenuLink } from '@app/modules/layout/menu.component';
import { RecursiveSideDrawer } from '@app/modules/layout/recursive-side-drawer.component';
import { SideDrawerLayout } from '@app/modules/layout/side-drawer.layout';
import { PatientConsultationPage, PatientRoute } from '@app/modules/patient';
import { PatientListPage } from '@app/modules/patient/pacient-list.page';
import { PatientDetailPage } from '@app/modules/patient/patient-detail.page';
import { PatientEditPage } from '@app/modules/patient/patient-edit.page';
import { PatientNewPage } from '@app/modules/patient/patient-new.page';
import { PatientPhotoPage } from '@app/modules/patient/patient-photo.page';
import { useAuthorized } from '@app/route-guard/useAuthGuard.hook';
import { FaIcon } from '@atomic/atm.fa-icon';
import { SampleRoutes, sampleMenuLinks } from '@atomic-samples/sample.routes';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router';

export const links: MenuLink[] = [
  {
    to: PatientRoute.List,
    content: 'Pacientes',
    icon: <FaIcon.Patients />,
  },
  {
    to: FormRoute.List,
    content: 'Formulários',
    icon: <FaIcon.Form />,
  },
];

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={AuthRoutes.Login} element={<LazyLoginPage />} />
      <Route path={AuthRoutes.Registration} element={<LazyRegistrationPage />} />
      <Route path={AuthRoutes.ForgotPassword} element={<LazyForgotPasswordPage />} />
      <Route path={AuthRoutes.ResetPassword} element={<LazyResetPasswordPage />} />

      <Route
        path={'/'}
        element={<GuardElement sendPreviousPath redirectPath={AuthRoutes.Login} useGuard={useAuthorized} />}>
        <Route element={<Layout links={[...links, ...sampleMenuLinks]} />}>
          <Route index element={<Navigate to={PatientRoute.List} />} />
          <Route path={FormRoute.List} element={<FormListPage />} />
          <Route path={PatientRoute.Photo} element={<PatientPhotoPage />} />
          <Route path={FormRoute.Detail} element={<FormDetailPage />} />
          <Route path={PatientRoute.List} element={<PatientListPage />} />
          <Route path={PatientRoute.New} element={<PatientNewPage />} />
          <Route path={PatientRoute.Edit} element={<PatientEditPage />} />
          <Route path={PatientRoute.Detail} element={<PatientDetailPage />}>
            <Route path={PatientRoute.Consultation} element={<SideDrawerLayout />}>
              <Route
                index
                element={
                  <RecursiveSideDrawer level={1}>
                    <PatientConsultationPage />
                  </RecursiveSideDrawer>
                }
              />
            </Route>
          </Route>
          {SampleRoutes}
        </Route>
      </Route>
    </>,
  ),
);
