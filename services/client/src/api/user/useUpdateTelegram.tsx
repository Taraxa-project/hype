import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { UnpackNestedValue } from 'react-hook-form';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { NotificationType } from '../../utils';
import { API } from '../types';
import { HypeUser } from 'src/models/HypeUser.model';

const updateUser = async (user: HypeUser) => {
  const url = `${API}/users/${user.address}`;
  try {
    const { data } = await axios.post(url, user);
    return data as HypeUser;
  } catch (err) {
    console.log('Error in updateUser: ', err);
  }
};

export const useUpdateTelegram = () => {
  const queryClient = useQueryClient();
  const dispatchModals = useModalsDispatch();

  const { mutate } = useMutation((values: HypeUser) => updateUser(values));

  const submitHandler = (values: UnpackNestedValue<HypeUser>) => {
    const updatedUser: HypeUser = { ...values };
    mutate(updatedUser, {
      onSuccess: () => {
        queryClient.resetQueries();
        dispatchModals({
          type: ModalsActionsEnum.SHOW_NOTIFICATION,
          payload: {
            open: true,
            type: NotificationType.SUCCESS,
            message: 'User successfully updated!',
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
