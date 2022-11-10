import ABIs from '../abi';
import { hypeAddress } from '../constants';
import { useContractRead } from 'wagmi';

const useContractGetPool = (tokenId: number) => {
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

export default useContractGetPool;
