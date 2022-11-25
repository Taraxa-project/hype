import ABIs from '../abi';
import { escrowAddress } from '../constants';
import { useAccount, useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';

const useContractEscrowGetDepositsOff = (poolId: BigNumber) => {
  const { address: payee } = useAccount();
  const { abi } = ABIs.contracts.DynamicEscrow;

  const { data, isError, isLoading } = useContractRead({
    address: escrowAddress,
    abi,
    functionName: 'depositsOf',
    args: [payee, poolId],
    enabled: !payee || !!poolId,
  });

  return {
    data,
    isError,
    isLoading,
  };
};

export default useContractEscrowGetDepositsOff;
