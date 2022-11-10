export interface AddHypePool {
  title: string;
  projectName: string;
  tokenName?: string;
  projectDescription: string;
  description: string;
  word: string;
  network: string;
  token: string;
  minReward: number;
  impressionReward: number;
  cap: number;
  endDate: Date;
}

export interface HypePool extends AddHypePool {
  id?: number;
  creator: string;
  active: boolean;
}
