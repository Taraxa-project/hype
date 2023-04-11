import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from '../../constants';
import { HypeUser } from '../../models';

const getByAddress = (publicAddress: string) => {
  if (!publicAddress) {
    return;
  }
  const url = `${API}/users`;
  const params = {
    publicAddress,
  };
  return axios.get(url, { params });
};

export const useGetHypeUserBy = (publicAddress: string) => {
  const { data, isError, error, isLoading, isFetching } = useQuery(
    ['hype-user', publicAddress],
    () => getByAddress(publicAddress),
    {
      onError: (error) => {
        console.log('ERROR: ', error);
      },
      enabled: !!publicAddress,
    },
  );
  return {
    data: data?.data as HypeUser,
    isError,
    error,
    isLoading,
    isFetching,
  };
};
