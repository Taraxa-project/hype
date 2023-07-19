import { ethers } from 'ethers';
import { useMemo } from 'react';
import { networks } from '../utils/networks';
import { useNetwork } from 'wagmi';

function useBrowserProvider() {
  const { chain } = useNetwork();
  const provider = useMemo(
    () => new ethers.providers.JsonRpcProvider(networks[chain.id].rpcUrl),
    [],
  );
  return { chain, provider };
}

export default useBrowserProvider;
