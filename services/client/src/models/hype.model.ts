export interface AddHypePool {
  projectName: string;
  title: string;
  description: string;
  rewardsAccount: string;
  pool: number;
  minReward: number;
  startDate: Date;
  endDate: Date;
}

export interface HypePool extends AddHypePool {
  creatorAddress: string;
}
