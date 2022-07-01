import { useGetUser } from '../api/auth/useGetUser';
import { useEffect, useState } from 'react';
import useWallet from './useWallet';
import { useSignMessage } from 'wagmi';
import { useLogin } from '../api/auth/useLogin';
import { LoginSignature } from '../models';
import { getAuthenticationToken, removeAuthenticationToken } from '../utils';
import { useQueryClient } from 'react-query';

const useAuth = () => {
  const queryClient = useQueryClient();
  const { account, disconnect, connector, isDisconnected } = useWallet();
  const { data: user, refetch } = useGetUser(account);
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
    removeAuthenticationToken();
    disconnect();
    queryClient.clear();
  };

  useEffect(() => {
    if (user && connector) {
      signMessage({ message: `${user.nonce}` });
    }
  }, [user, connector, signMessage]);

  useEffect(() => {
    if (account && !tokenExists) {
      refetch();
    }
  }, [account, tokenExists]);

  useEffect(() => {
    if (isDisconnected) {
      logout();
    }
  }, [isDisconnected])

  return {
    authenticated,
    logout,
  };
};

export default useAuth;
