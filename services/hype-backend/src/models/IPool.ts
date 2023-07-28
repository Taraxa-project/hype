export interface IPool {
  id?: string;
  title: string;
  tokenName: string;
  tokenAddress: string;
  status: string;
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
  campaignWord: string;
  leaderRewards: number[];
}
