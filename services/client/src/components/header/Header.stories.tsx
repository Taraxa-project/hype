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
  variant: 'mobile',
  headerElements: headerValues,
  status: 'connected',
  onConnect: () => {},
  account: '0x6e3AA85dB95BBA316276a3...82aFB',
};

export const MobileDisconnected = Template.bind({});
MobileDisconnected.args = {
  variant: 'mobile',
  headerElements: headerValues,
  status: 'notConnected',
  onConnect: () => {},
};

export const MobileUnavailable = Template.bind({});
MobileUnavailable.args = {
  variant: 'mobile',
  headerElements: headerValues,
  status: 'unavailable',
  onConnect: () => {},
};

export const DesktopConnected = Template.bind({});
DesktopConnected.args = {
  variant: 'desktop',
  headerElements: headerValues,
  status: 'connected',
  onConnect: () => {},
  account: '0x6e3AA85dB95BBA316276a3...82aFB',
};

export const DesktopDisconnected = Template.bind({});
DesktopDisconnected.args = {
  variant: 'desktop',
  headerElements: headerValues,
  status: 'notConnected',
  onConnect: () => {},
};

export const DesktopUnavailable = Template.bind({});
DesktopUnavailable.args = {
  variant: 'desktop',
  headerElements: headerValues,
  status: 'unavailable',
  onConnect: () => {},
};
