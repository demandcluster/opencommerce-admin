module.exports = {
  framework: '@storybook/react',
  stories: ['../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  features: {
      emotionAlias: false,
  },
};
