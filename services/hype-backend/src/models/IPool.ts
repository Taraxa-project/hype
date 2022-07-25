export interface IPool {
  id?: number;
  projectName: string;
  title: string;
  description: string;
  creatorAddress: string;
  rewardsAddress: string;
  pool: number;
  minReward: number;
  startDate: Date;
  endDate: Date;
  tokenId?: number;
}

export interface PoolPaginate {
  data: any[];
  total: number;
}
