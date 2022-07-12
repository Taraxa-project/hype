import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { LoginSignature } from '../../models';
import { NotificationType } from '../../utils';
import { setAuthenticationToken } from '../../utils';
import { AUTH_API } from '../types';

const sendSignature = (login: LoginSignature) => {
  if (!login) {
    return;
  }
  const url = `${AUTH_API}/auth/login`;
  return axios.post(url, login);
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess } = useMutation(
    (values: LoginSignature) => sendSignature(values),
    {
      useErrorBoundary: true,
    },
  );
  const dispatchModals = useModalsDispatch();

  const onLogin = (values: LoginSignature) => {
    mutate(values, {
      onSuccess: ({ data }) => {
        setAuthenticationToken(data?.accessToken);
        queryClient.resetQueries();
        dispatchModals({
          type: ModalsActionsEnum.SHOW_NOTIFICATION,
          payload: {
            open: true,
            type: NotificationType.SUCCESS,
            message: 'Login successful!',
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
  return { isLoading, isSuccess, onLogin };
};
