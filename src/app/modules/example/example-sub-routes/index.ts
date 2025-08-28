import { lazy } from 'react';

export const LazyExampleSubRoutePage = lazy(() => import(/* webpackPrefetch: true */ './example-sub-route.page'));

export const LazySecondExampleSubRoutePage = lazy(
  () => import(/* webpackPrefetch: true */ './second-example-sub-route.page'),
);
