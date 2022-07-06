import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { LoginSignature } from '../../models';
import { NotificationType } from '../../utils';
import { setAuthenticationToken } from '../../utils';
import { AUTH_API } from '../types';

const sendSignature = async (login: LoginSignature) => {
  if (!login) {
    return;
  }
  const url = `${AUTH_API}/auth/login`;
  try {
    const { data } = await axios.post(url, login);
    return data;
  } catch (err) {
    console.log('Error in sendSignature: ', err);
  }
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation((values: LoginSignature) => sendSignature(values), {
    useErrorBoundary: true,
  });
  const dispatchModals = useModalsDispatch();

  const onLogin = (values: LoginSignature) => {
    mutate(values, {
      onSuccess: ({ accessToken }) => {
        setAuthenticationToken(accessToken);
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
  return onLogin;
};
