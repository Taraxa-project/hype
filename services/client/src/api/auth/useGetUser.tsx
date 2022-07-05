import axios from 'axios';
import { useQuery } from 'react-query';
import { User } from '../../models';
import { AUTH_API } from '../types';

const login = async (publicAddress: string) => {
  if (!publicAddress) {
    return;
  }
  const url = `${AUTH_API}/auth`;
  const params = {
    publicAddress,
  };
  const { data } = await axios.get(url, { params });
  return data as User;
};

export const useGetUser = (publicAddress: string) => {
  const { data, refetch } = useQuery(['user', publicAddress], () => login(publicAddress), {
    enabled: false,
    onError: (error) => {
      console.log('ERROR: ', error);
    },
  });
  return {
    data,
    refetch,
  };
};
