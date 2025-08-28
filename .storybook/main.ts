export default {
  stories: [
    '../src/atomic/**/*.mdx',
    '../src/atomic/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/app/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    'storybook-addon-apollo-client',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  docs: {
    autodocs: true,
  },
};
