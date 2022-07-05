import axios from 'axios';
import { useQuery } from 'react-query';
import useAuth from '../../hooks/useAuth';
import { User } from '../../models';
import { AUTH_API } from '../types';

const getMe = async () => {
  const url = `${AUTH_API}/auth/me`;
  const { data } = (await axios.get(url));
  return data as User;
};

export const useGetMe = () => {
  const { authenticated } = useAuth();
  const { data, refetch } = useQuery('me', () => getMe(), {
    retry: false,
    useErrorBoundary: true,
    enabled: authenticated,
    onError: (error) => {
      console.log('ERROR: ', error);
    },
  });
  return {
    data,
    refetch,
  };
};
