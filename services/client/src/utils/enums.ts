export enum TransactionStatus {
  REDEEMED = 'Redeemed',
  PENDING = 'Pending redemption',
}

export enum PoolOrderByEnum {
  PROJECT_NAME = 'projectName',
  TITLE = 'title',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  START_DATE = 'startDate',
  END_DATE = 'endDate',
  CREATOR_ADDRESS = 'creatorAddress',
  REWARDS_ADDRESS = 'rewardsAddress',
}

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}
export enum NotificationType {
  INFO = 'Info',
  SUCCESS = 'Success',
  ERROR = 'Error',
}

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'info';

export const AUTHENTICATION_TOKEN = 'AUTHENTICATION_TOKEN';

export const zeroAddress = '0x0000000000000000000000000000000000000000';
export const ethToken = 'ETH';
export const taraToken = 'TARA';
