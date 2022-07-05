import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

const useWallet = () => {
  const metamaskConnector = new MetaMaskConnector({
    options: {
      shimChainChangedDisconnect: false,
    },
  });
  const { connect } = useConnect({
    connector: metamaskConnector,
  });
  const { address: account, connector, isConnected, isDisconnected } = useAccount();
  const isMetamaskAvailable = !((window as any).web3 || (window as any).ethereum);
  const { disconnect } = useDisconnect();

  return {
    isMetamaskAvailable,
    isConnected,
    account,
    connect,
    disconnect,
    connector,
    isDisconnected,
  };
};

export default useWallet;