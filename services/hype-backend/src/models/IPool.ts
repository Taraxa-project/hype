export interface IPool {
  id?: number;
  title: string;
  tokenName: string;
  tokenAddress: string;
  active: boolean;
  projectName: string;
  projectDescription: string;
  description: string;
  network: number;
  uri: string;
  cap: number;
  creator: string;
  endDate: Date;
  impressionReward: number;
  word: string;
}