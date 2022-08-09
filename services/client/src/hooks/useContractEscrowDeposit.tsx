import ABIs from '../abi';
import { utils } from 'ethers';
import { hypeAddress } from '../constants';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

const useContractEscrowDeposit = () => {
  const { abi } = ABIs.contracts.DynamicEscrow;
  const hypeInterface = new utils.Interface(abi);

  const { config } = usePrepareContractWrite({
    addressOrName: hypeAddress,
    contractInterface: hypeInterface,
    functionName: 'deposit',
  });

  const { data, isError, isLoading, write } = useContractWrite(config);

  return {
    data,
    isError,
    isLoading,
    write,
  };
};

export default useContractEscrowDeposit;
