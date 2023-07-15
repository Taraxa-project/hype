import ABIs from '../../abi';
import { hypeAddress } from '../../constants';
import { useContractRead } from 'wagmi';

export const useContractPoolURI = (tokenId: number) => {
  const { abi } = ABIs.contracts.HypePool;

  const { data, isError, isLoading } = useContractRead({
    address: hypeAddress,
    abi,
    functionName: 'poolURI',
    args: [tokenId],
  });

  return {
    data,
    isError,
    isLoading,
  };
};
