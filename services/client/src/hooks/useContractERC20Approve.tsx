import ABIs from '../abi';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { useLoadingModals } from './useLoadingModals';
import { useContractEscrowDeposit } from './useContractEscrowDeposit';
import { AddressType, NotificationType } from '../utils';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

export const useContractERC20Approve = (
  spender: string,
  poolId: BigNumber,
  amount: BigNumber,
  tokenAddress: AddressType,
  enabled: boolean,
  successCallbackDeposit: () => void,
) => {
  const { abi } = ABIs.contracts.HypeToken;
  const [enableDeposit, setEnableDeposit] = useState<boolean>(false);
  const { showLoading, hideLoadingModal, showNotificationModal } = useLoadingModals();
  useContractEscrowDeposit(
    spender as AddressType,
    poolId,
    amount,
    tokenAddress,
    enableDeposit,
    successCallbackDeposit,
  );

  const { config } = usePrepareContractWrite({
    address: tokenAddress,
    abi,
    functionName: 'approve',
    args: [spender, amount],
    overrides: {
      gasLimit: BigNumber.from(9999999),
    },
    enabled: !!spender && !!poolId && !!amount && !!tokenAddress && enabled,
  });

  const {
    data,
    isError,
    isLoading,
    write: approve,
  } = useContractWrite({
    ...config,
    onMutate() {
      showLoading([
        'Please, sign the message...',
        'You need to approve in order to deposit your funds',
      ]);
    },
    onError(error: any) {
      console.log('onError', error);
      hideLoadingModal();
      showNotificationModal(NotificationType.ERROR, error?.message);
    },
  });

  useWaitForTransaction({
    hash: data?.hash,
    onSuccess(transactionData) {
      hideLoadingModal();
    },
    onError(error: any) {
      console.log('onError', error);
      hideLoadingModal();
      showNotificationModal(NotificationType.ERROR, error?.message);
    },
    onSettled() {
      hideLoadingModal();
      setEnableDeposit(true);
    },
  });

  useEffect(() => {
    if (enabled && spender && poolId && amount && tokenAddress && typeof approve === 'function') {
      approve();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return {
    isError,
    isLoading,
  };
};
