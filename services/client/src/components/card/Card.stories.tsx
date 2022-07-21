import { ComponentStory } from '@storybook/react';
import Card, { CardProps } from './Card';

export default {
  title: 'Hype/Card',
  component: Card,
};

const Template: ComponentStory<typeof Card> = (args) => <Card {...args}></Card>;

export const Regular = Template.bind({} as CardProps);
Regular.args = {
  projectName: 'ApeCoin Hype',
  title: 'ApeCoin Staking Launch!',
  description:
    'Culture has found new expression in web3 through art, gaming, entertainment, and events. The possibilities for blockchain`s impact on culture are so endless that they can`t possibly all be predicted yet. APE is a token made to support what`s next, controlled and built on by the community. It will serve as a decentralized protocol layer for community-led initiatives that drive culture forward into the metaverse.',
  pool: 100000,
  rewardsAddress: '0x4d224452801ACEd8B2F0aebE155379bb5D594381',
  creatorAddress: '0x000000000000000000000000000000000000002',
  minReward: 1,
  startDate: new Date(),
  endDate: new Date(new Date().setMonth(new Date().getMonth() + 5)),
};

export const Mobile = Template.bind({} as CardProps);
Mobile.args = {
  projectName: 'ApeCoin Hype',
  title: 'ApeCoin Staking Launch!',
  description:
    'Culture has found new expression in web3 through art, gaming, entertainment, and events. The possibilities for blockchain`s impact on culture are so endless that they can`t possibly all be predicted yet. APE is a token made to support what`s next, controlled and built on by the community. It will serve as a decentralized protocol layer for community-led initiatives that drive culture forward into the metaverse.',
  pool: 100000,
  rewardsAddress: '0x4d224452801ACEd8B2F0aebE155379bb5D594381',
  creatorAddress: '0x000000000000000000000000000000000000002',
  minReward: 1,
  startDate: new Date(),
  endDate: new Date(new Date().setMonth(new Date().getMonth() + 5)),
};
