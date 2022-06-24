export enum TransactionStatus {
  REDEEMED = 'Redeemed',
  PENDING = 'Pending redemption',
}

export enum NotificationType {
  INFO = 'Info',
  SUCCESS = 'Success',
  ERROR = 'Error',
}

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger';