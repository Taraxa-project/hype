import { useEthers } from '@usedapp/core';
import { useEffect, useState } from 'react';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';

export const useConnectWalletEffects = () => {
  const { account, activateBrowserWallet } = useEthers();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const dispatchModals = useModalsDispatch();
  const isUnMetamaskAvailable = !((window as any).web3 || (window as any).ethereum);

  useEffect(() => {
    setIsConnected(account !== undefined);
  }, [account]);

  const showMetamaskInfo = () => {
    dispatchModals({
      type: ModalsActionsEnum.SHOW_METAMASK_INFO,
      payload: {
        open: true,
        title: 'Connect wallet',
        text: 'Please, consider browsing the app in Metamask app.',
        message: 'Metamask not available',
      },
    });
  };

  const onConnect = () => {
    if (isUnMetamaskAvailable) {
      showMetamaskInfo();
    }
    activateBrowserWallet();
  }

  return {
    onConnect,
    isConnected,
  };
};
