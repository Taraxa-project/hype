import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { AddHypePool, HypePool } from '../../models';
import { UnpackNestedValue } from 'react-hook-form';
import useWallet from '../../hooks/useWallet';
import { API } from './types';

const postNewPool = async (pool: HypePool) => {
  const url = `${API}/pools`;
  const { data } = await axios.post(url, pool);
  return data as HypePool;
};

export const useAddHypePool = () => {
  const queryClient = useQueryClient();
  const { account } = useWallet();

  const { mutate } = useMutation((values: HypePool) => postNewPool(values));

  const submitHandler = (values: UnpackNestedValue<AddHypePool>) => {
    const newHypePool: HypePool = { ...values, creatorAddress: account };
    mutate(newHypePool, {
      onSuccess: () => {
        queryClient.resetQueries();
      },
      onError: (error: any) => {
        console.log('Error: ', error);
      },
    });
  };
  return submitHandler;
};
