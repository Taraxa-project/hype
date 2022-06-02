export interface IPool {
  id?: number;
  name: string;
  description: string;
  accountAddress: string;
  minReward: number;
  poolCap: number;
  poolEnds: Date;
}
