import axios, { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { NotificationType } from '../../utils';
import { ApiError, HypeUser } from '../../models';
import { API } from '../../constants';

const updateUser = (user: HypeUser) => {
  const url = `${API}/users`;
  return axios.post(url, user);
};

export const useUpdateTelegram = () => {
  const queryClient = useQueryClient();
  const dispatchModals = useModalsDispatch();

  const { mutate } = useMutation((values: HypeUser) => updateUser(values));

  const submitHandler = (values: HypeUser) => {
    const updatedUser: HypeUser = { ...values };
    mutate(updatedUser, {
      onSuccess: () => {
        queryClient.invalidateQueries(['request-rewards']);
        dispatchModals({
          type: ModalsActionsEnum.SHOW_NOTIFICATION,
          payload: {
            open: true,
            type: NotificationType.SUCCESS,
            message: ['User successfully updated!'],
          },
        });
      },
      onError: (error: any) => {
        console.log('Error: ', error);
        const errorData = error as AxiosError;
        const errorMessage = errorData?.response?.data as ApiError;

        console.error('Error message: ', errorMessage);
        dispatchModals({
          type: ModalsActionsEnum.SHOW_NOTIFICATION,
          payload: {
            open: true,
            type: NotificationType.ERROR,
            message: [errorMessage?.message || 'Something went wrong'],
          },
        });
      },
    });
  };
  return submitHandler;
};
