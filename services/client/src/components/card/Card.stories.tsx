import { ComponentStory } from '@storybook/react';
import Card, { CardProps } from './Card';

export default {
  title: 'Hype/Card',
  component: Card,
};

const Template: ComponentStory<typeof Card> = (args) => <Card {...args}></Card>;

export const Regular = Template.bind({} as CardProps);
const pool = {
  projectName: 'ApeCoin Hype',
  title: 'ApeCoin Staking Launch!',
  description:
    'Culture has found new expression in web3 through art, gaming, entertainment, and events. The possibilities for blockchain`s impact on culture are so endless that they can`t possibly all be predicted yet. APE is a token made to support what`s next, controlled and built on by the community. It will serve as a decentralized protocol layer for community-led initiatives that drive culture forward into the metaverse.',
  projectDescription: 'Something nice about ApeCoin',
  cap: 100000,
  tokenAddress: '0x4d224452801ACEd8B2F0aebE155379bb5D594381',
  creator: '0x000000000000000000000000000000000000002',
  word: 'testnet',
  network: 1,
  token: 'APE',
  tokenName: 'APE',
  impressionReward: 2,
  active: true,
  endDate: new Date(new Date().setMonth(new Date().getMonth() + 5)),
};
Regular.args = {
  pool,
};

export const Mobile = Template.bind({} as CardProps);
Mobile.args = {
  pool,
};
