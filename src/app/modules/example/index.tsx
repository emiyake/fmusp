import { lazy } from 'react';

export const LazyExamplePage = lazy(() => import(/* webpackPrefetch: true */ './example.page'));
