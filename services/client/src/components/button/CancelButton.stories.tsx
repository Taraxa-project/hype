import React from 'react';
import { ComponentStory } from '@storybook/react';
import Button from './Button';

export default {
  title: 'Hype/Button',
  component: Button,
};

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>Cancel</Button>;

export const CancelSmall = Template.bind({});
CancelSmall.args = { size: 'small', variant: 'secondary' };

export const CancelRegular = Template.bind({});
CancelRegular.args = { size: 'regular', variant: 'secondary' };

export const CancelFullwidth = Template.bind({});
CancelFullwidth.args = { size: 'full-width', variant: 'secondary' };
