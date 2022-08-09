import ABIs from '../abi';
import { utils } from 'ethers';
import { hypeAddress } from '../constants';
import { useContractWrite, useWaitForTransaction, usePrepareContractWrite } from 'wagmi';
import { ModalsActionsEnum, useModalsDispatch } from '../context';
import { NotificationType } from '../utils';
import { useEffect } from 'react';

export interface WritePoolArgs {
  uri: string;
  projectName: string;
  title: string;
  poolCap: number;
  tokenAddress: string;
  minHypeReward: number;
  endDate: number;
}

const useContractCreatePool = (
  args: WritePoolArgs,
  enabled: boolean,
  resetWriteContract: () => void,
) => {
  const { abi } = ABIs.contracts.HypePool;
  const hypeInterface = new utils.Interface(abi);
  const dispatchModals = useModalsDispatch();

  const { config } = usePrepareContractWrite({
    addressOrName: hypeAddress,
    contractInterface: hypeInterface,
    functionName: 'createPool',
    args: [
      args.uri,
      args.projectName,
      args.title,
      args.poolCap,
      args.tokenAddress,
      args.minHypeReward,
      args.endDate,
    ],
    overrides: {
      gasLimit: 9999999,
    },
    enabled,
  });

  const {
    data: poolData,
    isError,
    isLoading,
    write,
  } = useContractWrite({
    ...config,
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
    onSuccess(data: any) {
      console.log('Successfully called', data);
    },
    onError(error: any) {
      console.log('On error: ', error);
      hideLoadingModal();
      showErrorModal(error?.message);
      resetWriteContract();
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
      resetWriteContract();
    },
    onError(error) {
      console.log('Error', error);
      hideLoadingModal();
      showErrorModal(error?.message);
      resetWriteContract();
    },
    onSettled(data, error) {
      console.log('Settled', { data, error });
      hideLoadingModal();
    },
  });

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

  useEffect(() => {
    if (enabled && args && typeof write === 'function') {
      write();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, args, write]);

  return {
    isError,
    isLoading,
    write,
    waitForTransaction,
  };
};

export default useContractCreatePool;
