export interface TelegramGroup {
  groupUsername: string;
  groupId?: number;
  groupTitle?: string;
  createdAt?: Date;
}

export interface GroupPaginate {
  data: TelegramGroup[];
  total: number;
}

export interface FetchGroupFilter {
  take: number;
  skip: number;
  search?: string;
}
