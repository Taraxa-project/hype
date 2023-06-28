import { BigNumber } from 'ethers';
import { TransactionStatus } from '../utils';
import { RewardsDetails } from './Redeem.model';

export type TransactionItem = {
  value: BigNumber;
  symbol: string;
  pool?: string;
  status: TransactionStatus;
  startDate: Date;
  impressions?: RewardsDetails[];
};

export type Reward = Omit<TransactionItem, 'status'>;
