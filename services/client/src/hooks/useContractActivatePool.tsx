import ABIs from '../abi';
import { utils } from 'ethers';
import { hypeAddress } from '../constants';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

const useContractActivatePool = () => {
  const { abi } = ABIs.contracts.HypePool;
  const hypeInterface = new utils.Interface(abi);

  const { config } = usePrepareContractWrite({
    addressOrName: hypeAddress,
    contractInterface: hypeInterface,
    functionName: 'activatePool',
  });

  const { data, isError, isLoading, write } = useContractWrite(config);

  return {
    data,
    isError,
    isLoading,
    write,
  };
};

export default useContractActivatePool;
