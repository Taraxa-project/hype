import { IReward } from './IReward';

export interface IClaim extends IReward {
  hash: string;
}
