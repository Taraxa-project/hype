export interface IPool {
  id?: string;
  title: string;
  tokenName: string;
  tokenAddress: string;
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
  status: PoolStatus;
}

export enum PoolStatus {
  CREATED = 'CREATED',
  FUNDED = 'FUNDED',
  STARTED = 'STARTED',
  EXPIRED = 'EXPIRED',
  GRACE_PERIOD = 'GRACE_PERIOD',
}
