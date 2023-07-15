export interface IReward {
  poolId: string;
  amount: string;
  telegramId?: string;
  rewardee: string;
  telegramUsername?: string;
  impressions?: number;
  tokenAddress: string;
  telegramGroup?: string;
  isBonus?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
}
