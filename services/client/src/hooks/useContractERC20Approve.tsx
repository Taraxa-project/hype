import ABIs from '../abi';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import useLoadingModals from './useLoadingModals';
import useContractEscrowDeposit from './useContractEscrowDeposit';
import { NotificationType } from '../utils';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

const useContractERC20Approve = (
  spender: string,
  poolId: BigNumber,
  amount: BigNumber,
  tokenAddress: string,
  enabled: boolean,
  successCallbackDeposit: () => void,
) => {
  const { abi } = ABIs.contracts.HypeToken;
  const [enableDeposit, setEnableDeposit] = useState<boolean>(false);
  const { showLoading, hideLoadingModal, showNotificationModal } = useLoadingModals();
  useContractEscrowDeposit(
    spender,
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
    enabled: (!!spender || !!poolId || !!amount || !!tokenAddress) && enabled,
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
    onSuccess(transactionData) {
      hideLoadingModal();
      console.log('onSuccess', transactionData);
    },
    onError(error: any) {
      console.log('onError', error);
      hideLoadingModal();
      showNotificationModal(NotificationType.ERROR, error?.message);
    },
    onSettled(data, error) {
      console.log('onSettled', { data, error });
      hideLoadingModal();
      setEnableDeposit(true);
    },
  });

  useEffect(() => {
    if (enabled && spender && poolId && amount && tokenAddress && typeof approve === 'function') {
      approve();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, spender, poolId, amount, tokenAddress]);

  return {
    isError,
    isLoading,
  };
};

export default useContractERC20Approve;
