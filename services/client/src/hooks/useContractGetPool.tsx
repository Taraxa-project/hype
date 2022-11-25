import ABIs from '../abi';
import { hypeAddress } from '../constants';
import { useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';

export const useContractGetPool = (tokenId: BigNumber) => {
  const { abi } = ABIs.contracts.HypePool;

  const { data, isError, isLoading } = useContractRead({
    address: hypeAddress,
    abi,
    functionName: 'getPool',
    args: [tokenId],
  });

  return {
    data,
    isError,
    isLoading,
  };
};
