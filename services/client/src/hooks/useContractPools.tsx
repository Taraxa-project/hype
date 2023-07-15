import { useMemo } from 'react';
import { ethers } from 'ethers';
import useMainnet from './useMainnet';
import { useProvider, useSigner } from 'wagmi';
import ABIs from '../abi';
import { hypeAddress } from '../constants';

export function useContractPools() {
  const { provider: mainnetProvider } = useMainnet();
  const browserProvider = useProvider();
  const { data: signer } = useSigner();

  const { abi } = ABIs.contracts.HypePool;

  const mainnetHype = useMemo(() => {
    let instance: ethers.Contract | undefined;

    if (!mainnetProvider) {
      return instance;
    }

    try {
      const contract = new ethers.Contract(hypeAddress, abi, mainnetProvider);
      instance = contract;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      instance = undefined;
    }
    return instance;
  }, [mainnetProvider]);

  const browserHype = useMemo(() => {
    let instance: ethers.Contract | undefined;

    if (!browserProvider || !signer) {
      return instance;
    }
    const contract = new ethers.Contract(hypeAddress, abi, browserProvider);
    return contract.connect(signer);
  }, [browserProvider, signer]);

  return {
    mainnetHype,
    browserHype,
  };
}
