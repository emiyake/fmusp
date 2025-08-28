import type React from 'react';
import { Suspense } from 'react';

import { Route, Routes } from 'react-router';

import { LazyExampleSubRoutePage, LazySecondExampleSubRoutePage } from '@app/modules/example/example-sub-routes';
import { WithGuardExampleRoutes } from '@app/modules/example/example.routes';
import { ActivityIndicator } from '@atomic/atm.activity-indicator';

export const ExampleSubRoutesRouter: React.FC = () => {
  return (
    <Suspense fallback={<ActivityIndicator type="circle" />}>
      <Routes>
        <Route path={WithGuardExampleRoutes.ExampleSubRoute} element={<LazyExampleSubRoutePage />} />
        <Route path={WithGuardExampleRoutes.SecondExampleSubRoute} element={<LazySecondExampleSubRoutePage />} />
      </Routes>
    </Suspense>
  );
};
