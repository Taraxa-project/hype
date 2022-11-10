import ABIs from '../abi';
import { hypeAddress } from '../constants';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { useModalsDispatch } from '../context';
import useLoadingModals from './useLoadingModals';
import { NotificationType } from '../utils';

const useContractActivatePool = (id: number) => {
  const { abi } = ABIs.contracts.HypePool;
  const dispatchModals = useModalsDispatch();
  const { showLoading, hideLoadingModal, showNotificationModal } = useLoadingModals();

  const { config } = usePrepareContractWrite({
    address: hypeAddress,
    abi,
    functionName: 'activatePool',
    args: [id],
    // overrides: {
    //   gasLimit: 9999999,
    // },
    enabled: !!id,
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

  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
    // wait: poolData?.wait,
    onSuccess(transactionData) {
      hideLoadingModal();
      // showSuccessModal();
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

  return {
    data,
    isError,
    isLoading,
    write,
  };
};

export default useContractActivatePool;
