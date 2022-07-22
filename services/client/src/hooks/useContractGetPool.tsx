import ABIs from '../abi';
import { utils } from 'ethers';
import { hypeAddress } from '../constants';
import { useContractRead } from 'wagmi';

const useContractGetPool = (tokenId: number) => {
  const { abi } = ABIs.contracts.HypePool;
  const hypeInterface = new utils.Interface(abi);

  const { data, isError, isLoading } = useContractRead({
    addressOrName: hypeAddress,
    contractInterface: hypeInterface,
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
