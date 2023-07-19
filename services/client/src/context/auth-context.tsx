/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAuthMessage } from '../api/auth/useGetAuthMessage';
import { useLogin } from '../api/auth/useLogin';
import useWallet from '../hooks/useWallet';
import { getAuthenticationToken, NotificationType, removeAuthenticationToken } from '../utils';
import { useSignMessage } from 'wagmi';
import { LoginSignature } from '../models';
import { ModalsActionsEnum, useModalsDispatch } from './modal';
import jwt_decode from 'jwt-decode';

type SignMessageArgs = {
  /** Message to sign with wallet */
  message: string | Uint8Array;
};

type JwtData = {
  address: string;
  exp: number;
  iat: number;
  nonce: number;
};

export interface IAuthContext {
  account: string;
  authenticated: boolean;
  logout: () => void;
  signMessage: (args?: SignMessageArgs) => void;
  tokenExists: boolean;
  isLoginLoading: boolean;
  isLoginSuccess: boolean;
  isSignatureLoading: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  account: null,
  authenticated: false,
  logout: () => {},
  signMessage: () => {},
  tokenExists: false,
  isLoginLoading: false,
  isLoginSuccess: false,
  isSignatureLoading: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { account, connector, isConnected, disconnect, isDisconnected } = useWallet();
  const { data: authMessage, refetch: refetchAuthMessage } = useGetAuthMessage(account);
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [isSignatureLoading, setIsSignatureLoading] = useState<boolean>(false);
  const { onLogin, isLoading: isLoginLoading, isSuccess: isLoginSuccess } = useLogin();
  const dispatchModals = useModalsDispatch();

  const { signMessage, error: signMessageError } = useSignMessage({
    onSuccess(data: any) {
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
    if (authMessage && connector) {
      setIsSignatureLoading(true);
      signMessage({ message: authMessage.message });
    }
  }, [authMessage, connector]);

  useEffect(() => {
    if (account && !tokenExists) {
      refetchAuthMessage();
    }
  }, [account, tokenExists]);

  useEffect(() => {
    if (!isLoginLoading && isLoginSuccess) {
      setIsSignatureLoading(false);
    }
  }, [isLoginLoading, isLoginSuccess]);

  useEffect(() => {
    const token = getAuthenticationToken();
    if (token) {
      const decodedToken: JwtData = jwt_decode(token);
      const accountInToken = decodedToken.address;
      if (account !== accountInToken) {
        dispatchModals({
          type: ModalsActionsEnum.SHOW_NOTIFICATION,
          payload: {
            open: true,
            type: NotificationType.INFO,
            message: [
              'You have changed your account',
              'Please sign in again.',
              'You have to sign the request in your Metamask wallet in order to access your profile.',
            ],
            title: 'Account changed',
          },
        });
        logout();
      }
    }
  }, [account]);

  const context: IAuthContext = {
    account,
    authenticated,
    logout,
    signMessage,
    tokenExists,
    isLoginLoading,
    isLoginSuccess,
    isSignatureLoading,
  };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};
