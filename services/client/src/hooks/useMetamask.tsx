import { useEthers } from '@usedapp/core';
import { useEffect, useState } from 'react';

const useMetamask = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const { account, activateBrowserWallet } = useEthers();
  const isUnMetamaskAvailable = !((window as any).web3 || (window as any).ethereum);

  useEffect(() => {
    setIsConnected(account !== undefined);
  }, [account]);


  return {
    isUnMetamaskAvailable,
    isConnected,
    account,
    activateBrowserWallet,
  }
}

export default useMetamask;