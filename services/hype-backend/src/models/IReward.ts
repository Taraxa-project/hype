import { IPool } from './IPool';

export interface IReward {
  rewardee: string;
  amount: string;
  tokenAddress: string;
  pool: IPool;
}
