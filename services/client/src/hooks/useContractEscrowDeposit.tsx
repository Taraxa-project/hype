import ABIs from '../abi';
import { utils } from 'ethers';
import { hypeAddress } from '../constants';
import { useContractWrite } from 'wagmi';

const useContractEscrowDeposit = () => {
  const { abi } = ABIs.contracts.DynamicEscrow;
  const hypeInterface = new utils.Interface(abi);

  const { data, isError, isLoading, write } = useContractWrite({
    addressOrName: hypeAddress,
    contractInterface: hypeInterface,
    functionName: 'deposit',
  });

  return {
    data,
    isError,
    isLoading,
    write,
  };
};

export default useContractEscrowDeposit;
