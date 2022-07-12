import React from 'react';
import { ComponentStory } from '@storybook/react';
import Header from './Header';
import { HeaderLink, HeaderValues } from './Header.effects';

export default {
  title: 'Hype/Header',
  component: Header,
};

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

const headerValues: HeaderLink[] = [
  {
    route: '/farming',
    name: HeaderValues.HypeFarming,
  },
  {
    route: '/pool',
    name: HeaderValues.HypePool,
  },
  {
    route: '/redeem',
    name: HeaderValues.Redeem,
  },
  {
    route: '/',
    name: HeaderValues.None,
  },
];

export const MobileConnected = Template.bind({});
MobileConnected.args = {
  headerElements: headerValues,
  connected: true,
  onConnect: () => {},
  account: '0x6e3AA85dB95BBA316276a3...82aFB',
};

export const MobileDisconnected = Template.bind({});
MobileDisconnected.args = {
  headerElements: headerValues,
  connected: false,
  onConnect: () => {},
};

export const MobileUnavailable = Template.bind({});
MobileUnavailable.args = {
  headerElements: headerValues,
  connected: false,
  onConnect: () => {},
};

export const DesktopConnected = Template.bind({});
DesktopConnected.args = {
  headerElements: headerValues,
  connected: true,
  onConnect: () => {},
  account: '0x6e3AA85dB95BBA316276a3...82aFB',
};

export const DesktopDisconnected = Template.bind({});
DesktopDisconnected.args = {
  headerElements: headerValues,
  connected: false,
  onConnect: () => {},
};
