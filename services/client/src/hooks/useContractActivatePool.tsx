import ABIs from '../abi';
import { utils } from 'ethers';
import { hypeAddress } from '../constants';
import { useContractWrite } from 'wagmi';

const useContractActivatePool = () => {
  const { abi } = ABIs.contracts.HypePool;
  const hypeInterface = new utils.Interface(abi);

  const { data, isError, isLoading, write } = useContractWrite({
    addressOrName: hypeAddress,
    contractInterface: hypeInterface,
    functionName: 'activatePool',
  });

  return {
    data,
    isError,
    isLoading,
    write,
  };
};

export default useContractActivatePool;
