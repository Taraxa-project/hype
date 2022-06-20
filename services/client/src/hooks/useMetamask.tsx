import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

const useMetamask = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [account, setAccount] = useState<string>(null);
  const { connect } = useConnect();
  const { data: currentAccount } = useAccount();
  const isUnMetamaskAvailable = !((window as any).web3 || (window as any).ethereum);
  const { disconnect } = useDisconnect();

  useEffect(() => {
    setIsConnected(currentAccount !== null);
    if (currentAccount?.address) {
      setAccount(currentAccount?.address);
    }
  }, [currentAccount]);

  return {
    isUnMetamaskAvailable,
    isConnected,
    account,
    connect,
    disconnect,
  };
};

export default useMetamask;
