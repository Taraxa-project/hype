import { BigNumber } from 'ethers';
import { HypePool } from './HypePool.model';

export interface RewardsDetails {
  telegramGroup: string;
  impressions: number;
  rewards: string;
}

export interface HypeRewardSummary {
  totalUnclaimed: PoolRewards[];
  claims: HypeClaim[];
  rewardsReceived: HypeClaim[];
}

export interface PoolRewards {
  unclaimed: BigNumber;
  poolId: string;
  tokenAddress: string;
  impressions: RewardsDetails[];
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
  pool: HypePool;
}

export interface HypeClaim extends HypeReward {
  hash: string;
  nonce: number;
}
