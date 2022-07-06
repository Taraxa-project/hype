import { TransactionStatus } from "../utils";

export type TransactionItem = {
  value: number;
  pool?: string;
  status: TransactionStatus;
  startDate: Date;
};

export type Reward = Omit<TransactionItem, 'status'>;
