import axios from 'axios';
import { useQuery } from 'react-query';
import { HypePool } from '../../models';
import { API } from '../types';

const getPoolsBy = (creatorAddress: string) => {
  if (!creatorAddress) {
    return undefined;
  }
  const url = `${API}/pools/by`;
  const params = {
    creatorAddress,
  };
  return axios.get(url, { params });
};

export const useGetHypePoolsBy = (creatorAddress: string) => {
  const { isLoading, isError, data, error } = useQuery(
    ['pools', creatorAddress],
    () => getPoolsBy(creatorAddress),
    {
      retry: false,
      enabled: !!creatorAddress,
    },
  );

  return {
    isLoading,
    isError,
    data: data?.data as HypePool[],
    error,
  };
};
