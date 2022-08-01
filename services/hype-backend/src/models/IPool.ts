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
  data: ContractHypePool[];
  total: number;
}

export interface ContractHypePool {
  projectName: string;
  title: string;
  description: string;
  token: string;
  cap: number;
  minReward: number;
  endDate: Date;
  creator: string;
  active: boolean;
  tokenId?: number;
}
