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
  try {
    const { data } = await axios.get(url, { params });
    return data;
  } catch (err: any) {
    console.log('err', err);
   
  }
};

export const useGetHypePoolsBy = (creatorAddress: string) => {
  const { isLoading, isError, data, error } = useQuery(
    ['pools', creatorAddress],
    () => getPoolsBy(creatorAddress),
    {
      retry: false,
      enabled: !!creatorAddress,
    },
  );

  return {
    isLoading,
    isError,
    data,
    error,
  };
};
