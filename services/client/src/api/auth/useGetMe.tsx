import axios from 'axios';
import { useQuery } from 'react-query';
import { useAuth } from '../../hooks';
import { AuthUser } from '../../models';
import { AUTH_API } from '../types';

const getMe = () => {
  const url = `${AUTH_API}/auth/me`;
  return axios.get(url);
};

export const useGetMe = () => {
  const { authenticated } = useAuth();
  const { data, refetch, isError, error } = useQuery('me', getMe, {
    retry: false,
    enabled: authenticated,
    onError: (error) => {
      console.log('ERROR: ', error);
    },
  });
  return {
    data: data?.data as AuthUser,
    refetch,
    isError,
    error,
  };
};
