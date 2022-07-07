import { useGetUser } from '../api/auth/useGetUser';
import { useEffect, useState } from 'react';
import useWallet from './useWallet';
import { useSignMessage } from 'wagmi';
import { useLogin } from '../api/auth/useLogin';
import { LoginSignature } from '../models';
import { getAuthenticationToken, NotificationType, removeAuthenticationToken } from '../utils';
import { ModalsActionsEnum, useModalsDispatch } from '../context';
import { useNavigate } from 'react-router';

const useAuth = () => {
  const { account, isConnected, disconnect, isDisconnected } = useWallet();
  const { data: user, refetch } = useGetUser(account);
  const dispatchModals = useModalsDispatch();
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const onLogin = useLogin();
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

  return {
    account,
    authenticated,
    logout,
    signMessage,
    user,
    tokenExists,
    refetch,
  };
};

export default useAuth;
