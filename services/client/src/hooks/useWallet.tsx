import { useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { ModalsActionsEnum, useModalsDispatch } from '../context';
import { NotificationType } from '../utils';

const useWallet = () => {
  const dispatchModals = useModalsDispatch();

  const metamaskConnector = new MetaMaskConnector({
    options: {
      shimChainChangedDisconnect: true,
    },
  });
  const {
    connect,
    isError: isConnectError,
    error: connectError,
  } = useConnect({
    connector: metamaskConnector,
  });
  const { address: account, connector, isConnected, isDisconnected } = useAccount();
  const isMetamaskAvailable = !((window as any).web3 || (window as any).ethereum);
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (connectError) {
      dispatchModals({
        type: ModalsActionsEnum.SHOW_NOTIFICATION,
        payload: {
          open: true,
          type: NotificationType.ERROR,
          message: [
            'Please consider reloading this page and sign in again.',
            'You have to sign the request in your Metamask wallet in order to access your profile.',
          ],
          title: 'Login failed',
        },
      });
    }
  }, [connectError, dispatchModals]);

  return {
    isMetamaskAvailable,
    isConnected,
    account,
    connect,
    disconnect,
    connector,
    isDisconnected,
    isConnectError,
    connectError,
  };
};

export default useWallet;
