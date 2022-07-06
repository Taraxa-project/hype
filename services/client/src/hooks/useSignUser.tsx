import { useEffect } from 'react';
import useAuth from './useAuth';
import useWallet from './useWallet';

const useSignUser = () => {
  const { account, connector } = useWallet();
  const { signMessage, user, tokenExists, refetch } = useAuth();

  useEffect(() => {
    if (user && connector) {
      signMessage({ message: `${user.nonce}` });
    }
  }, [user, connector]);

  useEffect(() => {
    if (account && !tokenExists) {
      refetch();
    }
  }, [account, tokenExists]);
};

export default useSignUser;
