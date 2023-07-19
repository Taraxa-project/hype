import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from '../../constants';
import { Leaderboard } from '../../models';

const getLeaderboard = (poolId: string) => {
  if (!poolId) {
    return;
  }
  const url = `${API}/pools/leaderboard/${poolId}`;
  return axios.get(url);
};

export const useGetPoolLeaderboard = (address: string) => {
  const { data, refetch, isError, error, isLoading } = useQuery(
    ['pool-leaderboard', address],
    () => getLeaderboard(address),
    {
      retry: false,
      onError: (error) => {
        console.log('ERROR: ', error);
      },
    },
  );
  return {
    data: data?.data as Leaderboard[],
    refetch,
    isError,
    isLoading,
    error,
  };
};
