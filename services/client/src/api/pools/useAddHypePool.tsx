import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { AddHypePool, HypePool } from '../../models';
import { UnpackNestedValue } from 'react-hook-form';
import useWallet from '../../hooks/useWallet';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { NotificationType } from '../../utils';
import { API } from '../types';

const postNewPool = async (pool: HypePool) => {
  const url = `${API}/pools`;
  try {
    const { data } = await axios.post(url, pool);
    return data as HypePool;
  } catch (err) {
    console.log('Error in postNewPool: ', err);
  }
};

export const useAddHypePool = () => {
  const queryClient = useQueryClient();
  const { account } = useWallet();
  const dispatchModals = useModalsDispatch();

  const { mutate } = useMutation((values: HypePool) => postNewPool(values));

  const submitHandler = (values: UnpackNestedValue<AddHypePool>) => {
    const newHypePool: HypePool = { ...values, creatorAddress: account };
    mutate(newHypePool, {
      onSuccess: () => {
        queryClient.resetQueries();
        dispatchModals({
          type: ModalsActionsEnum.SHOW_NOTIFICATION,
          payload: {
            open: true,
            type: NotificationType.SUCCESS,
            message: 'Hype Pool created!',
          },
        });
      },
      onError: (error: any) => {
        console.log('Error: ', error);
        dispatchModals({
          type: ModalsActionsEnum.SHOW_NOTIFICATION,
          payload: {
            open: true,
            type: NotificationType.ERROR,
            message: error || error?.message,
          },
        });
      },
    });
  };
  return submitHandler;
};
