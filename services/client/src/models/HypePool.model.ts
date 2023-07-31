export interface AddHypePool {
  title: string;
  projectName: string;
  projectDescription: string;
  description: string;
  campaignWord: string;
  network: number;
  token: string;
  impressionReward: number;
  cap: number;
  startDate: number;
  endDate: number;
  duration: number;
  tokenName?: string;
  remainingFunds?: string;
  imageUri?: string;
}

export enum PoolStatus {
  CREATED = 'Created',
  FUNDED = 'Funded',
  STARTED = 'Started',
  EXPIRED = 'Expired',
  ENDED = 'Ended',
}

export interface HypePool extends AddHypePool {
  id?: number;
  creator: string;
  status: string;
  tokenAddress?: string;
}

export interface HypeProjectDetails
  extends Pick<AddHypePool, 'projectDescription' | 'description'> {
  imageUri: string;
}
