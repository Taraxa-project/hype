import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from '../../constants';
import { HypeUser } from '../../models';

const getByAddress = () => {
  const url = `${API}/users/me`;
  return axios.get(url);
};

export const useGetHypeUser = () => {
  const { data, isError, error, isLoading, isFetching } = useQuery(
    ['hype-user'],
    () => getByAddress(),
    {
      onError: (error) => {
        console.log('ERROR: ', error);
      },
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
