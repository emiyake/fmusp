import { lazy } from 'react';

export const LazyHomePage = lazy(() => import(/* webpackPrefetch: true */ './home.page'));
