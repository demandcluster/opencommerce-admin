import { ComponentStory, ComponentMeta } from '@storybook/react';

import Avatar from './Avatar';

//👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  /*👇 The args you need here will depend on your component */
};
