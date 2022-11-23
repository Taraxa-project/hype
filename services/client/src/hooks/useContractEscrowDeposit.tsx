import ABIs from '../abi';
import { escrowAddress } from '../constants';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import useLoadingModals from './useLoadingModals';
import { NotificationType } from '../utils';
import { BigNumber, ethers } from 'ethers';
import { useEffect } from 'react';

const useContractEscrowDeposit = (
  spender: string,
  poolId: BigNumber,
  amount: BigNumber,
  tokenAddress: string,
  enabled: boolean,
  successCallbackDeposit: () => void,
) => {
  const { abi } = ABIs.contracts.DynamicEscrow;
  const { showLoading, hideLoadingModal, showNotificationModal } = useLoadingModals();

  const { config } = usePrepareContractWrite({
    address: escrowAddress,
    abi,
    functionName: 'deposit',
    args: [spender, poolId, amount, tokenAddress],
    enabled: !!spender || !!poolId || !!amount || !!tokenAddress,
    overrides: {
      from: spender as `0x${string}`,
      gasLimit: BigNumber.from(9999999),
      value: amount, // Not sure if this is needed
    },
  });

  const { data, isError, isLoading, write } = useContractWrite({
    ...config,
    onMutate() {
      showLoading(['Please, sign the message...', 'Depositing rewards...']);
    },
    onSuccess(data: any) {
      console.log('onSuccess', data);
    },
    onError(error: any) {
      console.log('onError', error);
      hideLoadingModal();
      showNotificationModal(NotificationType.ERROR, error?.message);
    },
  });

  useWaitForTransaction({
    hash: data?.hash,
    // wait: data?.wait,
    onSuccess(transactionData) {
      console.log('onSuccess', transactionData);
      hideLoadingModal();
      // showNotificationModal(NotificationType.SUCCESS, 'Funds successfully deposited');
    },
    onError(error: any) {
      console.log('onError', error);
      hideLoadingModal();
      showNotificationModal(NotificationType.ERROR, error?.message);
    },
    onSettled(data, error) {
      console.log('onSettled', { data, error });
      hideLoadingModal();
      successCallbackDeposit();
    },
  });

  useEffect(() => {
    if (enabled && spender && poolId && amount && tokenAddress && typeof write === 'function') {
      write();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, spender, poolId, amount, tokenAddress]);

  return {
    isError,
    isLoading,
  };
};

export default useContractEscrowDeposit;
