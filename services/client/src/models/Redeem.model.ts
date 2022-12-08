import { BigNumber } from 'ethers';

export interface HypeRewardSummary {
  totalUnclaimeds: PoolRewards[];
  claims: HypeClaim[];
}

export interface PoolRewards {
  unclaimed: BigNumber;
  poolId: number;
  tokenAddress: string;
  symbol?: string;
  poolName?: string;
}
export interface HypeReward {
  id: number;
  poolId: number;
  amount: BigNumber;
  symbol?: string;
  rewardee: string;
  tokenAddress: string;
  claimed: boolean;
  poolName?: string;
}

export interface HypeClaim extends HypeReward {
  hash: string;
}
