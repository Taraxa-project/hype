import { useState } from 'react';
import useMetamask from '../../hooks/useMetamask';
import { TransactionStatus } from '../../utils';

export type TransactionItem = {
  value: number;
  pool?: string;
  status: TransactionStatus;
  startDate: Date;
};

export type Reward = Omit<TransactionItem, 'status'>;

export const useRedeemEffects = () => {
  const { isConnected } = useMetamask();
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const totalUnredeemed = 52000;

  const pendingTransactions: TransactionItem[] = [
    {
      value: -52300,
      pool: 'NFT type',
      status: TransactionStatus.PENDING,
      startDate: new Date('02-12-2022'),
    },
  ];

  const redeemHistory: TransactionItem[] = [
    {
      value: -52001,
      status: TransactionStatus.REDEEMED,
      startDate: new Date('02-11-2022'),
    },
    {
      value: -52002,
      status: TransactionStatus.REDEEMED,
      startDate: new Date('02-10-2022'),
    },
  ];

  const onRedeem = (transaction: TransactionItem) => {
    console.log('Redeeming: ', transaction);
  };

  const rewards: Reward[] = [
    {
      value: 53000,
      pool: 'NFT Hype Pool',
      startDate: new Date('02-12-2022'),
    },
    {
      value: 54000,
      pool: 'NFT Hype Pool',
      startDate: new Date('03-12-2022'),
    },
    {
      value: 52000,
      pool: 'NFT Hype Pool',
      startDate: new Date('04-12-2022'),
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
    isConnected,
  };
};
