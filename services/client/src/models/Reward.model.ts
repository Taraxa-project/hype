import { BigNumber } from 'ethers';
import { TransactionStatus } from '../utils';

export type TransactionItem = {
  value: BigNumber;
  symbol: string;
  pool?: string;
  status: TransactionStatus;
  startDate: Date;
};

export type Reward = Omit<TransactionItem, 'status'>;
