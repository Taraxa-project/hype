import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { AddHypePool, HypePool } from '../../models';
import { UnpackNestedValue } from 'react-hook-form';

const postNewPool = async (pool: AddHypePool) => {
    console.log('Posting new request: ', pool);
//   const url = `${process.env.REACT_APP_API_HOST}/api/pools`;
//   const { data } = await axios.post(url, pool);
//   return data as HypePool;
};

export const useAddHypePool = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation((values: AddHypePool) => postNewPool(values));

  const submitHandler = (values: UnpackNestedValue<AddHypePool>) => {
    mutate(values, {
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
