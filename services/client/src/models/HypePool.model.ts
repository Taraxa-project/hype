export interface AddHypePool {
  projectName: string;
  title: string;
  description: string;
  token: string;
  cap: number;
  minReward: number;
  endDate: Date;
}

export interface HypePool extends AddHypePool {
  id: number;
  creator: string;
  active: boolean;
}
