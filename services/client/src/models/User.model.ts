// User model saved in Hype DB
export interface HypeUser {
  address: string;
  username: string;
  auth_date: number;
  telegramId: number;
}

// Telegram User model
export type TelegramUser = Readonly<{
  auth_date: number;
  first_name: string;
  last_name?: string;
  hash: string;
  id: number;
  photo_url?: string;
  username?: string;
}>;

export interface AuthUser {
  id?: number;
  publicAddress: string;
  nonce: number;
}
