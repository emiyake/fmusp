import { FlashMessageContainer } from '@atomic/mol.flash-message-container/flash-message-container.component';

import { RootRouter } from './root.router';

const App = () => {
  return (
    <>
      <RootRouter />
      <FlashMessageContainer renderPortal />
    </>
  );
};

export default App;
