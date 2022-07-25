/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUser } from '../api/auth/useGetUser';
import { useLogin } from '../api/auth/useLogin';
import useWallet from '../hooks/useWallet';
import { getAuthenticationToken, NotificationType, removeAuthenticationToken } from '../utils';
import { useSignMessage } from 'wagmi';
import { LoginSignature, User } from '../models';
import { SignMessageArgs } from '@wagmi/core';
import { RefetchOptions, RefetchQueryFilters } from 'react-query';
import { ModalsActionsEnum, useModalsDispatch } from './modal';

export interface IAuthContext {
  account: string;
  authenticated: boolean;
  logout: () => void;
  signMessage: (args?: SignMessageArgs) => void;
  user: User;
  tokenExists: boolean;
  refetch: <TPageData>(options?: RefetchOptions & RefetchQueryFilters<TPageData>) => Promise<any>;
  isLoginLoading: boolean;
  isLoginSuccess: boolean;
  isSignatureLoading: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  account: null,
  authenticated: false,
  logout: () => {},
  signMessage: () => {},
  user: null,
  tokenExists: false,
  refetch: () => new Promise(null),
  isLoginLoading: false,
  isLoginSuccess: false,
  isSignatureLoading: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { account, connector, isConnected, disconnect, isDisconnected } = useWallet();
  const { data: user, refetch } = useGetUser(account);
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [isSignatureLoading, setIsSignatureLoading] = useState<boolean>(false);
  const { onLogin, isLoading: isLoginLoading, isSuccess: isLoginSuccess } = useLogin();
  const dispatchModals = useModalsDispatch();

  const { signMessage, error: signMessageError } = useSignMessage({
    onSuccess(data) {
      // Verify signature when sign message succeeds
      const loginPayload: LoginSignature = {
        publicAddress: account,
        signature: data,
      };
      onLogin(loginPayload);
    },
  });

  useEffect(() => {
    if (signMessageError) {
      dispatchModals({
        type: ModalsActionsEnum.SHOW_NOTIFICATION,
        payload: {
          open: true,
          type: NotificationType.ERROR,
          message: [
            'Please consider reloading this page and sign in again.',
            'You have to sign the request in your Metamask wallet in order to access your profile.',
          ],
          title: 'Login failed',
        },
      });
    }
  }, [signMessageError, dispatchModals]);

  const tokenExists = Boolean(getAuthenticationToken());

  const logout = () => {
    setAuthenticated(false);
    disconnect();
    removeAuthenticationToken();
    navigate('/');
  };

  useEffect(() => {
    if (tokenExists && isConnected) {
      setAuthenticated(true);
    }
  }, [tokenExists, isConnected]);

  useEffect(() => {
    if (isDisconnected || !isConnected) {
      disconnect();
    }
  }, [isDisconnected, isConnected]);

  useEffect(() => {
    if (user && connector) {
      setIsSignatureLoading(true);
      signMessage({ message: `${user.nonce}` });
    }
  }, [user, connector]);

  useEffect(() => {
    if (account && !tokenExists) {
      refetch();
    }
  }, [account, tokenExists]);

  useEffect(() => {
    if (!isLoginLoading && isLoginSuccess) {
      setIsSignatureLoading(false);
    }
  }, [isLoginLoading, isLoginSuccess]);

  const context: IAuthContext = {
    account,
    authenticated,
    logout,
    signMessage,
    user,
    tokenExists,
    refetch,
    isLoginLoading,
    isLoginSuccess,
    isSignatureLoading,
  };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};
