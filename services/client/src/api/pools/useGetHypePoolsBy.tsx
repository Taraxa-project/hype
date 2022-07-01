import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from '../types';

const getPoolsBy = async (creatorAddress: string) => {
  if (!creatorAddress) {
    return undefined;
  }
  const url = `${API}/pools/by`;
  const params = {
    creatorAddress,
  };
  const { data } = await axios.get(url, { params });
  return data;
};

export const useGetHypePoolsBy = (creatorAddress: string) => {
  const { isLoading, isError, data, error } = useQuery(['pools', creatorAddress], () =>
    getPoolsBy(creatorAddress),
  );

  return {
    isLoading,
    isError,
    data,
    error,
  };
};
