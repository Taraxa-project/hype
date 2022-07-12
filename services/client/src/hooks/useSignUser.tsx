/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import useAuth from './useAuth';
import useWallet from './useWallet';

const useSignUser = () => {
  const { account, connector } = useWallet();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signMessage, user, tokenExists, refetch, isLoginLoading, isLoginSuccess } = useAuth();

  useEffect(() => {
    if (user && connector) {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  }, [isLoginLoading, isLoginSuccess]);

  return {
    isLoading,
  };
};

export default useSignUser;
