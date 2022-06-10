import React from 'react';
import { ComponentStory } from '@storybook/react';
import Input from './Input';
import SearchIcon from '../../assets/icons/Search';

export default {
  title: 'Hype/Input',
  component: Input,
};

const Template: ComponentStory<typeof Input> = (args) => <Input {...args}></Input>;

export const Regular = Template.bind({});
Regular.args = {};

export const Icon = Template.bind({});
Icon.args = { Icon: <SearchIcon />, label: 'Search for hype pools...' };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };
