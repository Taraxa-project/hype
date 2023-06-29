import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from '../../constants';
import { PoolStats } from '../../models';

const getStats = (poolId: string) => {
  if (!poolId) {
    return;
  }
  const url = `${API}/pools/stats/${poolId}`;
  return axios.get(url);
};

export const useGetPoolStats = (address: string) => {
  const { data, refetch, isError, error, isLoading } = useQuery(
    ['pool-stats', address],
    () => getStats(address),
    {
      retry: false,
      onError: (error) => {
        console.log('ERROR: ', error);
      },
    },
  );
  return {
    data: data?.data as PoolStats,
    refetch,
    isError,
    isLoading,
    error,
  };
};
