import { AUTHENTICATION_TOKEN } from './enums';

export type TSetAuthenticationToken = (token: string) => void;

export type TGetAuthenticationToken = () => string;

export type TRemoveAuthenticationToken = () => void;

export const setAuthenticationToken: TSetAuthenticationToken = (token) => {
  localStorage.setItem(AUTHENTICATION_TOKEN, token);
};

export const getAuthenticationToken: TGetAuthenticationToken = () => {
  return localStorage.getItem(AUTHENTICATION_TOKEN);
};

export const removeAuthenticationToken: TRemoveAuthenticationToken = () => {
  localStorage.removeItem(AUTHENTICATION_TOKEN);
};
