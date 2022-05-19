import React from "react";
import { ComponentStory } from "@storybook/react";
import Header, { HeaderValues } from "./Header";

export default {
  title: "Hype/Header",
  component: Header,
};

const Template: ComponentStory<typeof Header> = (args) => (
  <Header {...args}/>
);

export const MobileConnected = Template.bind({});
MobileConnected.args = { variant: "mobile", headerElements: [HeaderValues.HypeFarming, HeaderValues.HypePool, HeaderValues.Redeem], status: "connected", onConnect: () => {}, account: "0x6e3AA85dB95BBA316276a3...82aFB" };

export const MobileDisconnected = Template.bind({});
MobileDisconnected.args = { variant: "mobile", headerElements: [HeaderValues.HypeFarming, HeaderValues.HypePool, HeaderValues.Redeem], status: "disconnected", onConnect: () => {}};

export const MobileUnavailable = Template.bind({});
MobileUnavailable.args = { variant: "mobile", headerElements: [HeaderValues.HypeFarming, HeaderValues.HypePool, HeaderValues.Redeem], status: "unavailable", onConnect: () => {}};

export const DesktopConnected = Template.bind({});
DesktopConnected.args = { variant: "desktop",  headerElements: [HeaderValues.HypeFarming, HeaderValues.HypePool, HeaderValues.Redeem], status: "connected", onConnect: () => {}, account: "0x6e3AA85dB95BBA316276a3...82aFB"  };

export const DesktopDisconnected = Template.bind({});
DesktopDisconnected.args = { variant: "desktop", headerElements: [HeaderValues.HypeFarming, HeaderValues.HypePool, HeaderValues.Redeem], status: "disconnected", onConnect: () => {}};

export const DesktopUnavailable = Template.bind({});
DesktopUnavailable.args = { variant: "desktop", headerElements: [HeaderValues.HypeFarming, HeaderValues.HypePool, HeaderValues.Redeem], status: "unavailable", onConnect: () => {}};