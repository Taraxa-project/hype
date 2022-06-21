export interface AddHypePool {
  projectName: string;
  title: string;
  description: string;
  rewardsAddress: string;
  pool: number;
  minReward: number;
  startDate: Date;
  endDate: Date;
}

export interface HypePool extends AddHypePool {
  creatorAddress: string;
}
