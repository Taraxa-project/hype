export interface IPool {
  id?: number;
  title: string;
  description: string;
  pool: number;
  accountAddress: string;
  poolToken: string;
  bonus: number;
  bonusToken: string;
  minReward: number;
  rewardToken: string;
  startDate: Date;
  endDate: Date;
}
