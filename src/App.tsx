import { FlashMessageContainer } from '@atomic/mol.flash-message-container/flash-message-container.component';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router';
import { SupabaseProvider } from './app/core/use-supabase.tsx';
import { router } from './root.router';

const App = () => {
  return (
    <SupabaseProvider>
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
      <FlashMessageContainer renderPortal />
    </SupabaseProvider>
  );
};

export default App;
