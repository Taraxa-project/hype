import ABIs from '../abi';
import { escrowAddress } from '../constants';
import { useAccount, useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';

export const useContractEscrowGetDepositsOf = (poolId: string, enabled: boolean) => {
  const { address: payee } = useAccount();
  const { abi } = ABIs.contracts.DynamicEscrow;
  const { data, isError, isLoading } = useContractRead({
    address: escrowAddress,
    abi,
    functionName: 'depositsOf',
    args: [payee, poolId],
    enabled: (!payee || !!poolId) && enabled,
  }) as {
    data?: {
      poolId: string;
      weiAmount: BigNumber;
      tokenAddress: string;
    };
    error?: Error;
    isIdle: boolean;
    isLoading: boolean;
    isFetching: boolean;
    isSuccess: boolean;
    isError: boolean;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isRefetching: boolean;
    status: 'idle' | 'error' | 'loading' | 'success';
  };

  return {
    data,
    isError,
    isLoading,
  };
};
