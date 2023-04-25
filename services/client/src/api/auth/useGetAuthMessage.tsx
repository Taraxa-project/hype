import axios from 'axios';
import { useQuery } from 'react-query';
import { AUTH_API } from '../../constants';
import { AuthMessageResponse } from '../../models';

const getAuthenticationMessage = (publicAddress: string) => {
  if (!publicAddress) {
    return;
  }
  const url = `${AUTH_API}/auth`;
  const params = {
    publicAddress,
  };
  return axios.get(url, { params });
};

export const useGetAuthMessage = (publicAddress: string) => {
  const { data, refetch, isError, error } = useQuery(
    ['auth', publicAddress],
    () => getAuthenticationMessage(publicAddress),
    {
      enabled: false,
      onError: (error) => {
        console.log('ERROR: ', error);
      },
    },
  );
  return {
    data: data?.data as AuthMessageResponse,
    refetch,
    isError,
    error,
  };
};
