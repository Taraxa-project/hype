import ABIs from '../abi';
import { hypeAddress } from '../constants';
import { useContractWrite, useWaitForTransaction, usePrepareContractWrite } from 'wagmi';
import { ModalsActionsEnum, useModalsDispatch } from '../context';
import { useEffect } from 'react';
import useLoadingModals from './useLoadingModals';
import { NotificationType } from '../utils';

export interface WritePoolArgs {
  uri: string;
  projectName: string;
  tokenName?: string;
  title: string;
  projectDescription: string;
  description: string;
  poolCap: number;
  word: string;
  network: string;
  tokenAddress: string;
  minHypeReward: number;
  impressionReward: number;
  endDate: number;
}

const useContractCreatePool = (
  args: WritePoolArgs,
  enabled: boolean,
  resetWriteContract: () => void,
) => {
  const { abi } = ABIs.contracts.HypePool;
  const dispatchModals = useModalsDispatch();
  const { showLoading, hideLoadingModal, showNotificationModal } = useLoadingModals();

  const { config } = usePrepareContractWrite({
    address: hypeAddress,
    abi,
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
    // overrides: {
    //   gasLimit: 9999999,
    // },
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
      showLoading();
    },
    onSuccess(data: any) {
      console.log('Successfully called', data);
    },
    onError(error: any) {
      console.log('On error: ', error);
      hideLoadingModal();
      showNotificationModal(NotificationType.ERROR, error?.message);
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
    onError(error: any) {
      console.log('Error', error);
      hideLoadingModal();
      showNotificationModal(NotificationType.ERROR, error?.message);
      resetWriteContract();
    },
    onSettled(data, error) {
      console.log('Settled', { data, error });
      hideLoadingModal();
    },
  });

  const showSuccessModal = () => {
    dispatchModals({
      type: ModalsActionsEnum.SHOW_POOL_CREATED,
      payload: {
        open: true,
        pool: {
          projectName: args.projectName,
          title: args.title,
          token: args.tokenAddress,
          description: args.description,
        },
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
