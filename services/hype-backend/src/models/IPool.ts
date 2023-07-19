export interface IPool {
  id?: string;
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
  startDate: number;
  endDate: number;
  duration: number;
  impressionReward: number;
  word: string;
}
