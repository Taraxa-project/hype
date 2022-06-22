import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { HypePool } from '../../models';
import { OrderDirection, PoolOrderByEnum } from '../../utils';
import { useQuery } from 'react-query';

export interface FetchHypesFilter {
  take: number;
  skip: number;
  search?: string;
  orderBy?: PoolOrderByEnum;
  order?: OrderDirection;
}

export const useFetchData = ({ take, skip, search, order, orderBy }: FetchHypesFilter) => {
  const url = `${process.env.REACT_APP_API_HOST}/api/pools`;
  const fetchPools = async () => {
    const { data } = await axios.get(url, { params });
    return data;
  };

  const { isLoading, isError, data, error } = useQuery('pools', fetchPools)
  const params = {
    take,
    skip,
    // search: search || null,
    // orderBy: orderBy || null,
    // order: order || null,
  };

  return { data, error, isLoading, isError };
};
