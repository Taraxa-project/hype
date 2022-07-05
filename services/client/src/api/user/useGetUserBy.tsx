import axios from 'axios';
import { useQuery } from 'react-query';
import { HypeUser } from 'src/models/HypeUser.model';
import { API } from '../types';

const login = async (publicAddress: string) => {
  if (!publicAddress) {
    return;
  }
  const url = `${API}/users`;
  const params = {
    publicAddress,
  };
  const { data } = await axios.get(url, { params });
  return data as HypeUser;
};

export const useGetHypeUserBy = (publicAddress: string) => {
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
