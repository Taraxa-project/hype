import { useEffect, useState } from 'react';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import useMetamask from '../../hooks/useMetamask';

export const useConnectWalletEffects = () => {
  const { connect, status } = useMetamask();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isUnMetamaskAvailable, setIsMetamaskUnAvailable] = useState<boolean>(false);
  const dispatchModals = useModalsDispatch();

  useEffect(() => {
    setIsMetamaskUnAvailable(status === 'unavailable');
  }, [status]);

  useEffect(() => {
    setIsConnected(status === 'connected');
  }, [status]);

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
    connect();
  }

  return {
    onConnect,
    isConnected,
  };
};
