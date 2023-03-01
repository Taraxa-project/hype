import { BigNumber } from 'ethers';
import { HypePool } from './HypePool.model';

export interface HypeRewardSummary {
  totalUnclaimed: PoolRewards[];
  claims: HypeClaim[];
}

export interface PoolRewards {
  unclaimed: BigNumber;
  poolId: string;
  tokenAddress: string;
  symbol?: string;
  pool: HypePool;
}
export interface HypeReward {
  id: number;
  poolId: string;
  amount: BigNumber;
  symbol?: string;
  rewardee: string;
  tokenAddress: string;
  claimed: boolean;
  poolName?: string;
}

export interface HypeClaim extends HypeReward {
  hash: string;
  pool: HypePool;
}
