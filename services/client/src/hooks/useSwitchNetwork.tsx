import { networks } from '../utils';

export const useSwitchNetwork = () => {
  const changeNetwork = async (chainId: number) => {
    const chain = networks[chainId] ? chainId : 1;
    const hexChainId = `0x${chainId.toString(16)}`;
    const { chainName, rpcUrl, blockExplorerUrl, iconUrl, nativeCurrency } = networks[chain];

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: hexChainId }],
      });
    } catch (err: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainName,
              nativeCurrency,
              chainId: hexChainId,
              blockExplorerUrls: [blockExplorerUrl],
              iconUrls: [iconUrl],
              rpcUrls: [rpcUrl],
            },
          ],
        });
      }
    }
  };

  return {
    changeNetwork,
  };
};
