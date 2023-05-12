import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from '../../constants';
import { useAuth } from '../../hooks';
import { HypePool } from '../../models';

const getJoinedPools = (address: string) => {
  const url = `${API}/pools/joined/${address}`;
  return axios.get(url);
};

export const useGetJoinedPools = (address: string) => {
  const { authenticated } = useAuth();
  const { data, refetch, isError, error, isLoading } = useQuery(
    ['user-joined-pools', address],
    () => getJoinedPools(address),
    {
      retry: false,
      enabled: authenticated,
      onError: (error) => {
        console.log('ERROR: ', error);
      },
    },
  );
  return {
    data: data?.data as HypePool[],
    refetch,
    isError,
    isLoading,
    error,
  };
};
