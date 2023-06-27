import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from '../../constants';
import { useAuth } from '../../hooks';
import { HypePool } from '../../models';

const getJoinedPools = () => {
  const url = `${API}/pools/joined`;
  return axios.get(url);
};

export const useGetJoinedPools = () => {
  const { authenticated } = useAuth();
  const { data, refetch, isError, error, isLoading } = useQuery(
    ['user-joined-pools'],
    () => getJoinedPools(),
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
