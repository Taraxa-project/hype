import ABIs from '../abi';
import { utils } from 'ethers';
import { hypeAddress } from '../constants';
import { useContractWrite, useWaitForTransaction, useProvider } from 'wagmi';
import { ModalsActionsEnum, useModalsDispatch } from '../context';
import { NotificationType } from '../utils';

const useContractCreatePool = () => {
  const { abi } = ABIs.contracts.HypePool;
  const hypeInterface = new utils.Interface(abi);
  const dispatchModals = useModalsDispatch();
  const provider = useProvider();
  console.log('provider: ', provider);

  const {
    data: poolData,
    isError,
    isLoading,
    write,
  } = useContractWrite({
    addressOrName: hypeAddress,
    contractInterface: hypeInterface,
    functionName: 'createPool',
    overrides: {
      gasLimit: 10000000,
    },
    onMutate() {
      console.log('On mutate');
      dispatchModals({
        type: ModalsActionsEnum.SHOW_LOADING,
        payload: {
          open: true,
          title: 'Action required',
          text: 'Please, sign the message...',
        },
      });
    },
    onSuccess(data) {
      console.log('Successfully called', data);
    },
    onError(error) {
      console.log('On error: ', error);
      hideLoadingModal();
      showErrorModal(error?.message);
    },
  });

  const waitForTransaction = useWaitForTransaction({
    hash: poolData?.hash,
    // wait: poolData?.wait,
    onSuccess(transactionData) {
      console.log('Successfully minted Hype Pool mintedPool', poolData);
      console.log('Successfully minted Hype Pool transactionData', transactionData);
      hideLoadingModal();
      showSuccessModal();
    },
    onError(error) {
      console.log('Error', error);
      hideLoadingModal();
      showErrorModal(error?.message);
    },
    onSettled(data, error) {
      console.log('Settled', { data, error });
      hideLoadingModal();
    },
  });

  console.log('waitForTransaction status: ', waitForTransaction?.status);

  const hideLoadingModal = () => {
    dispatchModals({
      type: ModalsActionsEnum.SHOW_LOADING,
      payload: {
        open: false,
        title: null,
        text: null,
      },
    });
  };

  const showSuccessModal = () => {
    dispatchModals({
      type: ModalsActionsEnum.SHOW_NOTIFICATION,
      payload: {
        open: true,
        type: NotificationType.SUCCESS,
        message: ['Successfully minted Hype Pool'],
      },
    });
  };

  const showErrorModal = (err: string) => {
    dispatchModals({
      type: ModalsActionsEnum.SHOW_NOTIFICATION,
      payload: {
        open: true,
        type: NotificationType.ERROR,
        message: [err],
      },
    });
  };

  return {
    isError,
    isLoading,
    write,
    waitForTransaction,
  };
};

export default useContractCreatePool;
