import {useState} from "react";
import { TransactionStatus } from '../../utils';

export type Redeem = {
  value: number;
  pool?: string;
  status: TransactionStatus;
  startDate: Date;
};

export type Reward = Omit<Redeem, 'status'>;

export const useRedeemEffects = () => {
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const totalUnredeemed = 52.0;
  const redeemHistory: Redeem[] = [
    {
      value: 52000,
      status: TransactionStatus.REDEEMED,
      startDate: new Date(),
    },
    {
      value: 52000,
      status: TransactionStatus.PENDING,
      startDate: new Date(),
    },
    {
      value: 52000,
      status: TransactionStatus.REDEEMED,
      startDate: new Date(),
    },
    {
      value: 52000,
      status: TransactionStatus.PENDING,
      startDate: new Date(),
    },
  ];

  const onRedeem = (redeem: Redeem) => {
    console.log('Redeeming: ');
  };

  const rewards: Reward[] = [
    {
      value: 52000,
      pool: 'NFT Hype Pool',
      startDate: new Date('01-12-2022'),
    },
    {
      value: 52000,
      pool: 'NFT Hype Pool',
      startDate: new Date('01-12-2022'),
    },
    {
      value: 52000,
      pool: 'NFT Hype Pool',
      startDate: new Date('01-12-2022'),
    },
  ];

  return {
    showHistory,
    toggleHistory,
    totalUnredeemed,
    redeemHistory,
    rewards,
    onRedeem,
  };
};
