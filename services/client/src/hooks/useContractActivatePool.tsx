import ABIs from '../abi';
import { hypeAddress } from '../constants';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { NotificationType } from '../utils';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { useLoadingModals } from './useLoadingModals';

export const useContractActivatePool = (
  id: string,
  enabled: boolean,
  successCallbackActivatePool: () => void,
  resetWriteContract: () => void,
) => {
  const { abi } = ABIs.contracts.HypePool;
  const { showLoading, hideLoadingModal, showNotificationModal } = useLoadingModals();
  const [isWrite, setIsWrite] = useState<boolean>(false);

  const { config } = usePrepareContractWrite({
    address: hypeAddress,
    abi,
    functionName: 'activatePool',
    args: [id],
    overrides: {
      gasLimit: BigNumber.from(9999999),
    },
  });

  const { data, isError, isLoading, write } = useContractWrite({
    ...config,
    onMutate() {
      showLoading(['Please, sign the message...', 'Activating pool...']);
    },
    onSuccess(data: any) {
      resetWriteContract();
    },
    onError(error: any) {
      console.log('On error: ', error);
      hideLoadingModal();
      showNotificationModal(NotificationType.ERROR, error?.message);
      resetWriteContract();
    },
  });

  useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      hideLoadingModal();
      resetWriteContract();
    },
    onError(error: any) {
      console.log('Error', error);
      hideLoadingModal();
      showNotificationModal(NotificationType.ERROR, error?.message);
      resetWriteContract();
    },
    onSettled(data, error) {
      hideLoadingModal();
      successCallbackActivatePool();
    },
  });

  useEffect(() => {
    if (typeof write === 'function') {
      setIsWrite(true);
    }
  }, [write]);

  useEffect(() => {
    if (enabled && id && isWrite === true) {
      write();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, isWrite]);

  return {
    isError,
    isLoading,
  };
};
