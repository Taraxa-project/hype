export interface IClaim {
  poolId: string;
  amount: string;
  hash: string;
  rewardee: string;
  tokenAddress: string;
  claimed: boolean;
  nonce: number;
}
