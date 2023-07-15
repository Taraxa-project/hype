import ABIs from '../../abi';
import { escrowAddress } from '../../constants';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { useLoadingModals } from '../useLoadingModals';
import { AddressType, NotificationType } from '../../utils';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';

export const useContractEscrowDeposit = (
  spender: AddressType,
  poolId: string,
  amount: BigNumber,
  tokenAddress: string,
  enabled: boolean,
  isCustomToken: boolean,
  successCallbackDeposit: () => void,
  resetWriteContract: () => void,
) => {
  const { abi } = ABIs.contracts.DynamicEscrow;
  const { showLoading, hideLoadingModal, showNotificationModal } = useLoadingModals();
  const [isWrite, setIsWrite] = useState<boolean>(false);

  const { config } = usePrepareContractWrite({
    address: escrowAddress,
    abi,
    functionName: 'deposit',
    args: [spender, poolId, amount, tokenAddress],
    enabled: !!spender && !!poolId && !!amount && !!tokenAddress && enabled,
    overrides: {
      from: spender,
      gasLimit: BigNumber.from(9999999),
      value: amount, // Not sure if this is needed
    },
  });

  const { data, isError, isLoading, write } = useContractWrite({
    ...config,
    onMutate() {
      showLoading(['Please, sign the message...', 'Funding the pool...']);
    },
    onError(error: any) {
      console.log('onError', error);
      hideLoadingModal();
      showNotificationModal(NotificationType.ERROR, error?.message);
      resetWriteContract();
    },
  });

  useWaitForTransaction({
    hash: data?.hash,
    // wait: data?.wait,
    onSuccess(transactionData) {
      hideLoadingModal();
      resetWriteContract();
    },
    onError(error: any) {
      console.log('onError', error);
      hideLoadingModal();
      showNotificationModal(NotificationType.ERROR, error?.message);
      resetWriteContract();
    },
    onSettled() {
      hideLoadingModal();
      successCallbackDeposit();
    },
  });

  useEffect(() => {
    if (typeof write === 'function') {
      setIsWrite(true);
    }
  }, [write]);

  useEffect(() => {
    if (enabled && spender && poolId && amount && tokenAddress && isWrite === true) {
      write();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, isWrite]);

  return {
    isError,
    isLoading,
  };
};
