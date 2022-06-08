import {useState} from "react";
import { TransactionStatus } from '../../utils';

export type TransactionItem = {
  value: number;
  pool?: string;
  status: TransactionStatus;
  startDate: Date;
};

export type Reward = Omit<TransactionItem, 'status'>;

export const useRedeemEffects = () => {
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const totalUnredeemed = 52000;

  const pendingTransactions: TransactionItem[] = [
    {
      value: -52000,
      pool: 'NFT type',
      status: TransactionStatus.PENDING,
      startDate: new Date(),
    },
  ];

  const redeemHistory: TransactionItem[] = [
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

  const onRedeem = (transaction: TransactionItem) => {
    console.log('Redeeming: ', transaction);
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
    pendingTransactions,
    redeemHistory,
    rewards,
    onRedeem,
  };
};
