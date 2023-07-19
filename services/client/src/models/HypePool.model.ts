export interface AddHypePool {
  title: string;
  projectName: string;
  projectDescription: string;
  description: string;
  word: string;
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

export interface HypePool extends AddHypePool {
  id?: number;
  creator: string;
  active: boolean;
  tokenAddress?: string;
}

export interface HypeProjectDetails
  extends Pick<AddHypePool, 'projectDescription' | 'description'> {
  imageUri: string;
}
