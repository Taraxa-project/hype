import axios from 'axios';
import { useQuery } from 'react-query';
import useAuth from '../../hooks/useAuth';
import { User } from '../../models';
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
    data: data?.data as User,
    refetch,
    isError,
    error,
  };
};
