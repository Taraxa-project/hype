import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import TextArea from './TextArea';

export default {
  title: 'Hype/TextArea',
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => <TextArea {...args} />;

export const Regular = Template.bind({});
Regular.args = {};

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };
