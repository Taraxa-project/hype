export interface TelegramGroup {
  groupUsername: string;
  groupId?: number;
  groupTitle?: string;
  memberCount?: number;
  totalMessages?: number;
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
