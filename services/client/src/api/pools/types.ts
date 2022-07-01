import { HypePool } from '../../models';
import { OrderDirection, PoolOrderByEnum } from '../../utils';

export interface FetchHypesFilter {
  take: number;
  skip: number;
  search?: string;
  orderBy?: PoolOrderByEnum;
  order?: OrderDirection;
}

export interface PoolPaginate {
  data: HypePool[];
  total: number;
}

export const API = `${process.env.REACT_APP_API_HOST}`;
