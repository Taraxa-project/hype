export interface HypeUser {
  address: string;
  username: string;
  auth_date: number;
}

export type TelegramUser = Readonly<{
  auth_date: number;
  first_name: string;
  last_name?: string;
  hash: string;
  id: number;
  photo_url?: string;
  username?: string;
}>;