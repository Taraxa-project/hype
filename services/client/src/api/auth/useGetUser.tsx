import axios from 'axios';
import { useQuery } from 'react-query';
import { User } from '../../models';
import { AUTH_API } from '../types';

const login = (publicAddress: string) => {
  if (!publicAddress) {
    return;
  }
  const url = `${AUTH_API}/auth`;
  const params = {
    publicAddress,
  };
  return axios.get(url, { params });
};

export const useGetUser = (publicAddress: string) => {
  const { data, refetch, isError, error } = useQuery(
    ['user', publicAddress],
    () => login(publicAddress),
    {
      enabled: false,
      onError: (error) => {
        console.log('ERROR: ', error);
      },
    },
  );
  return {
    data: data?.data as User,
    refetch,
    isError,
    error,
  };
};
