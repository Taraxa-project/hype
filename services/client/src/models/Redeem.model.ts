import { BigNumber } from 'ethers';

export interface HypeRewardSummary {
  totalUnclaimeds: TokenSummary[];
  claimed: HypeReward[];
  unclaimed: HypeReward[];
}

export interface TokenSummary {
  unclaimed: BigNumber;
  token: string;
  symbol?: string;
}

export interface HypeReward {
  id: number;
  amount: BigNumber;
  symbol?: string;
  rewardee: string;
  tokenAddress: string;
  claimed: boolean;
}
