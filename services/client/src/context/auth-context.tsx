/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUser } from '../api/auth/useGetUser';
import { useLogin } from '../api/auth/useLogin';
import useWallet from '../hooks/useWallet';
import { getAuthenticationToken, NotificationType, removeAuthenticationToken } from '../utils';
import { ModalsActionsEnum, useModalsDispatch } from './modal';
import { useSignMessage } from 'wagmi';
import { LoginSignature, User } from '../models';
import { SignMessageArgs } from '@wagmi/core';
import { RefetchOptions, RefetchQueryFilters } from 'react-query';

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
  const dispatchModals = useModalsDispatch();
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [isSignatureLoading, setIsSignatureLoading] = useState<boolean>(false);
  const { onLogin, isLoading: isLoginLoading, isSuccess: isLoginSuccess } = useLogin();

  const { signMessage } = useSignMessage({
    onSuccess(data) {
      // Verify signature when sign message succeeds
      const loginPayload: LoginSignature = {
        publicAddress: account,
        signature: data,
      };
      onLogin(loginPayload);
    },
  });

  const tokenExists = Boolean(getAuthenticationToken());

  const logout = () => {
    setAuthenticated(false);
    disconnect();
    removeAuthenticationToken();
    dispatchModals({
      type: ModalsActionsEnum.SHOW_NOTIFICATION,
      payload: {
        open: true,
        type: NotificationType.ERROR,
        message: 'User must be logged in to access profile!',
      },
    });
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