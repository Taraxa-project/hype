import ABIs from '../abi';
import { hypeAddress } from '../constants';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { NotificationType } from '../utils';
import { BigNumber } from 'ethers';
import { useEffect } from 'react';
import { useLoadingModals } from './useLoadingModals';

export const useContractActivatePool = (
  id: BigNumber,
  enabled: boolean,
  successCallbackActivatePool: () => void,
) => {
  const { abi } = ABIs.contracts.HypePool;
  const { showLoading, hideLoadingModal, showNotificationModal } = useLoadingModals();

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
      console.log('Successfully called', data);
    },
    onError(error: any) {
      console.log('On error: ', error);
      hideLoadingModal();
      showNotificationModal(NotificationType.ERROR, error?.message);
    },
  });

  useWaitForTransaction({
    hash: data?.hash,
    onSuccess(transactionData) {
      console.log('Successfully called activate pool', transactionData);
      hideLoadingModal();
    },
    onError(error: any) {
      console.log('Error', error);
      hideLoadingModal();
      showNotificationModal(NotificationType.ERROR, error?.message);
    },
    onSettled(data, error) {
      console.log('Settled', { data, error });
      hideLoadingModal();
      successCallbackActivatePool();
    },
  });

  useEffect(() => {
    if (enabled && id && typeof write === 'function') {
      write();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, id]);

  return {
    isError,
    isLoading,
  };
};
