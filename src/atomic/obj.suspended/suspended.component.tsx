import type React from 'react';
import { Suspense } from 'react';

import {
  ErrorBoundary,
  type ErrorBoundaryProps as ReactErrorBoundaryProps,
  type ErrorBoundaryPropsWithComponent as ReactErrorBoundaryPropsWithComponent,
  type ErrorBoundaryPropsWithFallback as ReactErrorBoundaryPropsWithFallback,
  type ErrorBoundaryPropsWithRender as ReactErrorBoundaryPropsWithRender,
  type FallbackProps as ReactFallbackProps,
} from 'react-error-boundary';

export type FallbackProps = ReactFallbackProps;

type SuspendedProps = ErrorBoundaryProps & {
  loadingFallback?: React.ReactNode;
};

export const Suspended: React.FC<React.PropsWithChildren<SuspendedProps>> = props => {
  const errorBoundaryProps = {
    fallback: props.errorFallback,
    FallbackComponent: props.ErrorFallbackComponent,
    fallbackRender: props.errorFallbackRender,
  } as ReactErrorBoundaryProps;

  return (
    <ErrorBoundary
      onError={props.onError}
      onReset={props.onErrorReset}
      resetKeys={props.errorResetKeys}
      {...errorBoundaryProps}>
      <Suspense fallback={props.loadingFallback}>{props.children}</Suspense>
    </ErrorBoundary>
  );
};

type ErrorBoundarySharedProps = {
  onError?: ReactErrorBoundaryPropsWithComponent['onError'];
  onErrorReset?: ReactErrorBoundaryPropsWithComponent['onReset'];
  errorResetKeys?: ReactErrorBoundaryPropsWithComponent['resetKeys'];
};

type ErrorBoundaryPropsWithComponent = ErrorBoundarySharedProps & {
  errorFallback?: ReactErrorBoundaryPropsWithComponent['fallback'];
  ErrorFallbackComponent: ReactErrorBoundaryPropsWithComponent['FallbackComponent'];
  errorFallbackRender?: ReactErrorBoundaryPropsWithComponent['fallbackRender'];
};
type ErrorBoundaryPropsWithRender = ErrorBoundarySharedProps & {
  errorFallback?: ReactErrorBoundaryPropsWithRender['fallback'];
  ErrorFallbackComponent?: ReactErrorBoundaryPropsWithRender['FallbackComponent'];
  errorFallbackRender: ReactErrorBoundaryPropsWithRender['fallbackRender'];
};
type ErrorBoundaryPropsWithFallback = ErrorBoundarySharedProps & {
  errorFallback: ReactErrorBoundaryPropsWithFallback['fallback'];
  ErrorFallbackComponent?: ReactErrorBoundaryPropsWithFallback['FallbackComponent'];
  errorFallbackRender?: ReactErrorBoundaryPropsWithFallback['fallbackRender'];
};
type ErrorBoundaryPropsWithoutFallback = ErrorBoundarySharedProps & {
  errorFallback?: never;
  ErrorFallbackComponent?: never;
  errorFallbackRender?: never;
};

type ErrorBoundaryProps =
  | ErrorBoundaryPropsWithFallback
  | ErrorBoundaryPropsWithComponent
  | ErrorBoundaryPropsWithRender
  | ErrorBoundaryPropsWithoutFallback;
