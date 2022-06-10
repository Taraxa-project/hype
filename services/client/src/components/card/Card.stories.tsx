import { ComponentStory } from '@storybook/react';
import Card, { CardProps } from './Card';

export default {
  title: 'Hype/Card',
  component: Card,
};

const Template: ComponentStory<typeof Card> = (args) => <Card {...args}></Card>;

export const Regular = Template.bind({} as CardProps);
Regular.args = {
  title: 'ApeCoin Staking Launch!',
  pool: 100000,
  description:
    'APE is launching it’s testnet, and we’d like everyone to come & check it out! All participants will be able to claim rewards as loooooooong All participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongvvvAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongv',
  poolToken: 'APE',
  bonus: 2000,
  bonusToken: 'TARA',
  duration: `3 months left`,
  minReward: 2000,
  rewardToken: 'APE',
};

export const Mobile = Template.bind({} as CardProps);
Mobile.args = {
  variant: 'mobile',
  title: 'ApeCoin Staking Launch!',
  pool: 100000,
  description:
    'APE is launching it’s testnet, and we’d like everyone to come & check it out! All participants will be able to claim rewards as loooooooong All participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongvvvAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongv',
  poolToken: 'APE',
  bonus: 2000,
  bonusToken: 'TARA',
  duration: `3 months left`,
  minReward: 2000,
  rewardToken: 'APE',
};
