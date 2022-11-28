import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ModalsActionsEnum, useModalsDispatch } from '../context';
import { getAuthenticationToken, NotificationType } from '../utils';

const isUnauthorized = (response: AxiosResponse) => response?.status === 401;

export const useAxiosInterceptors = (logout: () => void) => {
  const dispatchModals = useModalsDispatch();
  axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    config.headers.authorization = `Bearer ${getAuthenticationToken()}`;
    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const authToken = getAuthenticationToken();
      if (isUnauthorized(error?.response) && authToken) {
        dispatchModals({
          type: ModalsActionsEnum.SHOW_NOTIFICATION,
          payload: {
            open: true,
            type: NotificationType.INFO,
            message: [
              'Please. consider re-login via Metamask wallet.',
              'You have to sign the request in your Metamask wallet in order to access your profile.',
            ],
            title: 'Your session has expired...',
          },
        });
        logout();
      }
    },
  );
};
