import React, {useState, useEffect} from 'react';
import { CardData } from 'src/components/card/Card';

export const useProfileEffects = () => {
  const [joinedPools, setJoinedPools] = useState<CardData[]>([]);
  const [createdPools, setCreatedPools] = useState<CardData[]>([]);
  const [currentReward, setCurrentReward] = useState<number>(0);

  const monthDiff = (dateFrom: Date, dateTo: Date): number => {
    if (!dateFrom || !dateTo) return 0;
    return (
      dateTo.getMonth() - dateFrom.getMonth() + 12 * (dateTo.getFullYear() - dateFrom.getFullYear())
    );
  };

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

  return { joinedPools, createdPools, currentReward };
};
