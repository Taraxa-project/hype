import { BigNumber } from 'ethers';

export interface HypeRewardSummary {
  totalUnclaimed: PoolRewards[];
  claims: HypeClaim[];
}

export interface PoolRewards {
  unclaimed: BigNumber;
  poolId: string;
  tokenAddress: string;
  symbol?: string;
  poolName?: string;
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
}
