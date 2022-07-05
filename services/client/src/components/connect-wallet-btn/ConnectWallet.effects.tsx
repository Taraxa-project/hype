import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import useWallet from '../../hooks/useWallet';

export const useConnectWalletEffects = () => {
  const { isConnected, connect, isMetamaskAvailable } = useWallet();
  const dispatchModals = useModalsDispatch();

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
    if (isMetamaskAvailable) {
      showMetamaskInfo();
    }
    connect();
  };

  return {
    onConnect,
    isConnected,
  };
};
