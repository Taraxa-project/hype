import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from '../../constants';
import { useAuth } from '../../hooks';
import { HypeRewardSummary } from '../../models/Redeem.model';

const getMyRewards = (address: string) => {
  const url = `${API}/rewards/${address}`;
  return axios.get(url);
};

export const useGetMyRewards = (address: string) => {
  const { authenticated } = useAuth();
  const { data, refetch, isError, error, isLoading } = useQuery(
    ['user-rewards', address],
    () => getMyRewards(address),
    {
      retry: false,
      enabled: authenticated,
      onError: (error) => {
        console.log('ERROR: ', error);
      },
    },
  );
  return {
    data: data?.data as HypeRewardSummary,
    refetch,
    isError,
    isLoading,
    error,
  };
};
