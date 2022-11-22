import ABIs from '../abi';
import { hypeAddress } from '../constants';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import useLoadingModals from './useLoadingModals';
import { NotificationType } from '../utils';
import { BigNumber } from 'ethers';
import { useEffect } from 'react';

const useContractActivatePool = (
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
    args: [+id.toString()], // Not sure if this should be number or BigNumber
    overrides: {
      gasLimit: BigNumber.from(9999999),
    },
    enabled: !!id && enabled,
  });

  const { data, isError, isLoading, write } = useContractWrite({
    ...config,
    onMutate() {
      showLoading();
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
      successCallbackActivatePool();
    },
    onError(error: any) {
      console.log('Error', error);
      hideLoadingModal();
      showNotificationModal(NotificationType.ERROR, error?.message);
    },
    onSettled(data, error) {
      console.log('Settled', { data, error });
      hideLoadingModal();
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

export default useContractActivatePool;
