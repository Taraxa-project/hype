import { useMemo } from 'react';
import { ethers } from 'ethers';
import useMainnet from './useMainnet';
import { useProvider, useSigner } from 'wagmi';
import ABIs from '../abi';
import { escrowAddress } from '../constants';

export function useContractEscrow() {
  const { provider: mainnetProvider } = useMainnet();
  const browserProvider = useProvider();
  const { data: signer } = useSigner();

  const { abi } = ABIs.contracts.DynamicEscrow;

  const mainnetEscrow = useMemo(() => {
    let instance: ethers.Contract | undefined;

    if (!mainnetProvider) {
      return instance;
    }

    try {
      const contract = new ethers.Contract(escrowAddress, abi, mainnetProvider);
      instance = contract;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      instance = undefined;
    }
    return instance;
  }, [mainnetProvider]);

  const browserEscrow = useMemo(() => {
    let instance: ethers.Contract | undefined;

    if (!browserProvider || !signer) {
      return instance;
    }
    const contract = new ethers.Contract(escrowAddress, abi, browserProvider);
    return contract.connect(signer);
  }, [browserProvider, signer]);

  return {
    mainnetEscrow,
    browserEscrow,
  };
}
