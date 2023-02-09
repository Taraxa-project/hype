export interface AddHypePool {
  title: string;
  projectName: string;
  tokenName?: string;
  projectDescription: string;
  description: string;
  word: string;
  network: number;
  token: string;
  impressionReward: number;
  cap: number;
  endDate: Date;
}

export interface HypePool extends AddHypePool {
  id?: number;
  creator: string;
  active: boolean;
  tokenAddress?: string;
}

export interface HypeProjectDetails
  extends Pick<AddHypePool, 'projectDescription' | 'description'> {}
