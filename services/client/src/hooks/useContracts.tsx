import { useMemo } from 'react';
import { ethers } from 'ethers';
import { useProvider, useSigner } from 'wagmi';
import ABIs from '../abi';
import { hypeAddress, escrowAddress } from '../constants';

export function useContracts() {
  const provider = useProvider();
  const { data: signer } = useSigner();

  const { abi: hypeABI } = ABIs.contracts.HypePool;
  const { abi: escrowABI } = ABIs.contracts.DynamicEscrow;

  const hypeContract = useMemo(() => {
    let instance: ethers.Contract | undefined;

    if (!provider || !signer) {
      return instance;
    }
    const contract = new ethers.Contract(hypeAddress, hypeABI, provider);
    return contract.connect(signer);
  }, [hypeABI, provider, signer]);

  const escrowContract = useMemo(() => {
    let instance: ethers.Contract | undefined;

    if (!provider || !signer) {
      return instance;
    }
    const contract = new ethers.Contract(escrowAddress, escrowABI, provider);
    return contract.connect(signer);
  }, [escrowABI, provider, signer]);

  return {
    hypeContract,
    escrowContract,
  };
}
