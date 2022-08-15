import { HypePool } from '../models';
import { OrderDirection, PoolOrderByEnum } from '../utils';

export interface FetchHypesFilter {
  first: number;
  skip: number;
  text?: string;
  orderBy?: PoolOrderByEnum;
  order?: OrderDirection;
}

export interface PoolPaginate {
  data: HypePool[];
  total: number;
}

export const API = `${process.env.REACT_APP_API_HOST}`;
export const AUTH_API = `${process.env.REACT_APP_WALLET_HOST}`;
export const GRAPHQL_API = `${process.env.REACT_APP_GRAPHQL_HOST}`;
