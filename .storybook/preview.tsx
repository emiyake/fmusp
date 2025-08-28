import '../src/assets/css/app.css';

import { MockedProvider } from '@apollo/client/testing';
import type { Preview } from '@storybook/react';

import { DarkModeDecorator } from './dark-mode.decorator';
const decorators = [DarkModeDecorator];

const preview: Preview = {
  decorators,
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    apolloClient: {
      MockedProvider,
    },
  },
};

export default preview;
