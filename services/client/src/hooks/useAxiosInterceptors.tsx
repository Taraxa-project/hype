import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAuthenticationToken } from '../utils';
import useAuth from './useAuth';

const isUnauthorized = (response: AxiosResponse) => response?.status === 401;

const useAxiosInterceptors = () => {
  const { logout } = useAuth();

  axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    config.headers.authorization = `Bearer ${getAuthenticationToken()}`;
    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const authToken = getAuthenticationToken();
      if (isUnauthorized(error?.response) && authToken) {
        logout();
      }
    },
  );
};

export default useAxiosInterceptors;
