import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import useMetamask from '../../hooks/useMetamask';

export const useConnectWalletEffects = () => {
  const { isConnected, connect, isUnMetamaskAvailable } = useMetamask();
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
    if (isUnMetamaskAvailable) {
      showMetamaskInfo();
    }
    connect();
  };

  return {
    onConnect,
    isConnected,
  };
};
