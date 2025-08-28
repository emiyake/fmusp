import { lazy } from 'react';

export const LazyForgotPasswordPage = lazy(() => import('./forgot-password.page'));
export const LazyLoginPage = lazy(() => import('./login.page'));
export const LazyRegistrationPage = lazy(() => import('./registration.page'));
export const LazyResetPasswordPage = lazy(() => import('./reset-password.page'));
