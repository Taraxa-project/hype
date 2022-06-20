import React, {useState, useEffect} from 'react';
import { TUser } from 'src/components/button/TelegramLoginButton';
import { CardData } from 'src/components/card/Card';


interface TelegramProfile {
    address: string;
    username: string;
}

export const useProfileEffects = () => {
  const [joinedPools, setJoinedPools] = useState<CardData[]>([]);
  const [createdPools, setCreatedPools] = useState<CardData[]>([]);
  const [currentReward, setCurrentReward] = useState<number>(0);
  const [telegramProfile, setTelegramProfile] = useState<TelegramProfile>({} as TelegramProfile);

  const onRedeem = ()  => {
      console.log('Bazinga! You clicked the button!')
  }

  const connect = (user: TUser) => {
      console.log('new T user is', user);
  }

  const disconnect = (user: any) => {
      console.log('disconnected user is', user);
  }

  const monthDiff = (dateFrom: Date, dateTo: Date): number => {
    if (!dateFrom || !dateTo) return 0;
    return (
      dateTo.getMonth() - dateFrom.getMonth() + 12 * (dateTo.getFullYear() - dateFrom.getFullYear())
    );
  };

  useEffect(() => {
    setTelegramProfile({
        address: '0x0000000000000000000000000000',
        username: 'hyper123'
    })
  }, []);

  useEffect(() => {
    setJoinedPools([
      {
        title: 'ApeCoin Staking Launch!',
        description:
          'APE is launching it’s testnet, and we’d like everyone to come & check it out! All participants will be able to claim rewards as loooooooong All participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongvvvAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongv',
        pool: 100000,
        poolToken: 'APE',
        bonus: 12000,
        creatorAddress: '0x0000000000000000000000000000',
        bonusToken: 'TARA',
        minReward: 1,
        rewardToken: 'APE',
        duration: `${monthDiff(
          new Date(),
          new Date(new Date().setDate(new Date().getDate() + 7)),
        )} months left`,
      },
      {
        title: 'ApeCoin Staking Launch!',
        description:
          'APE is launching it’s testnet, and we’d like everyone to come & check it out! All participants will be able to claim rewards as loooooooong All participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongvvvAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongv',
        pool: 100000,
        poolToken: 'APE',
        bonus: 12000,
        creatorAddress: '0x0000000000000000000000000000',
        bonusToken: 'TARA',
        minReward: 1,
        rewardToken: 'APE',
        duration: `${monthDiff(
          new Date(),
          new Date(new Date().setDate(new Date().getDate() + 7)),
        )} months left`,
      },
      {
        title: 'ApeCoin Staking Launch!',
        description:
          'APE is launching it’s testnet, and we’d like everyone to come & check it out! All participants will be able to claim rewards as loooooooong All participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongvvvAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongv',
        pool: 100000,
        poolToken: 'APE',
        bonus: 12000,
        creatorAddress: '0x0000000000000000000000000000',
        bonusToken: 'TARA',
        minReward: 1,
        rewardToken: 'APE',
        duration: `${monthDiff(
          new Date(),
          new Date(new Date().setDate(new Date().getDate() + 7)),
        )} months left`,
      },
      {
        title: 'ApeCoin Staking Launch!',
        description:
          'APE is launching it’s testnet, and we’d like everyone to come & check it out! All participants will be able to claim rewards as loooooooong All participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongvvvAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongAll participants will be able to claim rewards as loooooooongv',
        pool: 100000,
        poolToken: 'APE',
        bonus: 12000,
        creatorAddress: '0x0000000000000000000000000000',
        bonusToken: 'TARA',
        minReward: 1,
        rewardToken: 'APE',
        duration: `${monthDiff(
          new Date(),
          new Date(new Date().setDate(new Date().getDate() + 7)),
        )} months left`,
      }
    ]);
      setCurrentReward(10000);
  }, []);

  return { joinedPools, createdPools, currentReward, onRedeem, telegramProfile, connect, disconnect };
};
