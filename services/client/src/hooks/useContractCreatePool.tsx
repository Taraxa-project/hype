import ABIs from '../abi';
import { utils } from 'ethers';
import { hypeAddress } from '../constants';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { ModalsActionsEnum, useModalsDispatch } from '../context';
import { NotificationType } from '../utils';

const useContractCreatePool = () => {
  const { abi } = ABIs.contracts.HypePool;
  const hypeInterface = new utils.Interface(abi);
  const dispatchModals = useModalsDispatch();

  const { data, isError, isLoading, write } = useContractWrite({
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
    onError(data) {
      console.log('On error: ', data);
    },
  });

  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(transactionData) {
      console.log('Successfully minted Hype Pool mintedPool', data);
      console.log('Successfully minted Hype Pool transactionData', transactionData);
      dispatchModals({
        type: ModalsActionsEnum.SHOW_LOADING,
        payload: {
          open: false,
          title: null,
          text: null,
        },
      });
    },
    onError(error) {
      console.log('Error', error);
    },
    onSettled(data, error) {
      console.log('Settled', { data, error });
      dispatchModals({
        type: ModalsActionsEnum.SHOW_NOTIFICATION,
        payload: {
          open: true,
          type: NotificationType.SUCCESS,
          message: ['Successfully minted Hype Pool'],
        },
      });
    },
  });

  return {
    isError,
    isLoading,
    write,
    waitForTransaction,
  };
};

export default useContractCreatePool;
