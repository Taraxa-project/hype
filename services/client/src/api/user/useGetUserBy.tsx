import axios from 'axios';
import { useQuery } from 'react-query';
import { HypeUser } from 'src/models/HypeUser.model';
import { API } from '../types';

const getByAddress = async (publicAddress: string) => {
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
  const { data } = useQuery(['user', publicAddress], () => getByAddress(publicAddress), {
    onError: (error) => {
      console.log('ERROR: ', error);
    },
    enabled: !!publicAddress,
  });
  return {
    data,
  };
};
