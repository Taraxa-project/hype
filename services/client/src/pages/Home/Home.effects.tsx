import { useEffect, useState } from 'react';
import Card from 'src/components/card/Card';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';

interface CardData {
  title: string;
  description?: string;
  pool: number;
  poolToken: string;
  bonus: number;
  bonusToken: string;
  minReward: number;
  creatorAddress: string;
  rewardToken: string;
  startDate: Date;
  endDate: Date;
}

export const useHomeEffects = () => {
  const [cardData, setCardData] = useState<CardData[]>([{}] as CardData[]);
  const [titleFilter, setTitleFilter] = useState('');
  const dispatchModals = useModalsDispatch();

  useEffect(() => {
    setCardData([
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
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
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
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
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
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
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
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
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
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
    ]);
  }, []);

  const addMoreCards = () => {
    setTimeout(() => {
      const currCards = cardData;
      setCardData(currCards.concat(cardData));
    }, 3000);
  };

  const monthDiff = (dateFrom: Date, dateTo: Date): number => {
    if (!dateFrom || !dateTo) return 0;
    return (
      dateTo.getMonth() - dateFrom.getMonth() + 12 * (dateTo.getFullYear() - dateFrom.getFullYear())
    );
  };

  const filteredCards = (
    titleFilter ? cardData.filter((c) => c.title?.includes(titleFilter)) : cardData
  ).map((data, i) => (
    <Card
      key={`${data.title}-${i}`}
      title={data.title}
      pool={data.pool}
      description={data.description}
      poolToken={data.poolToken}
      bonus={data.bonus}
      creatorAddress={data.creatorAddress}
      bonusToken={data.bonusToken}
      duration={`${monthDiff(data.startDate, data.endDate)} months left`}
      minReward={data.minReward}
      rewardToken={data.rewardToken}
      onClick={() => {
        dispatchModals({
          type: ModalsActionsEnum.SHOW_CARD_DETAILS,
          payload: {
            open: true,
            cardData: cardData[i],
          },
        });
        // dispatchModals({
        //   type: ModalsActionsEnum.SHOW_LOADING,
        //   payload: {
        //     open: true,
        //     title: 'Action required...',
        //     text: 'Please, sign the message'
        //   },
        // });
        // dispatchModals({
        //   type: ModalsActionsEnum.SHOW_METAMASK_INFO,
        //   payload: {
        //     open: true,
        //     title: 'Connect wallet',
        //     text: 'Please, consider browsing the app in Metamask app.',
        //     message: 'Metamask not available',
        //   },
        // });
        // dispatchModals({
        //   type: ModalsActionsEnum.SHOW_TELEGRAM_INFO,
        //   payload: {
        //     open: true,
        //     title: 'Connect telegram',
        //     text: 'Error',
        //     message: 'Username already registered',
        //   },
        // });
        // dispatchModals({
        //   type: ModalsActionsEnum.SHOW_DISCONNECT_TELEGRAM,
        //   payload: {
        //     open: true,
        //     title: 'Disconnect account',
        //     text: 'Are you sure you want to disconnect this account?',
        //     username: '@hyper123',
        //     onDisconnect: () => {console.log('Disconnected')}
        //   },
        // });
      }}
    />
  ));

  return {
    setTitleFilter,
    addMoreCards,
    monthDiff,
    filteredCards,
    cardData,
  };
};
