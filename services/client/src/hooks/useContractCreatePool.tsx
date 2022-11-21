import ABIs from '../abi';
import { hypeAddress } from '../constants';
import { useContractWrite, useWaitForTransaction, usePrepareContractWrite } from 'wagmi';
import { ModalsActionsEnum, useModalsDispatch } from '../context';
import { useEffect } from 'react';
import useLoadingModals from './useLoadingModals';
import { NotificationType } from '../utils';
import { BigNumber } from 'ethers';

export interface WritePoolDetailsArgs {
  title: string;
  projectName: string;
  tokenName?: string;
  word: string;
}

export interface WritePoolRewardsArgs {
  network: number;
  tokenAddress: string;
  minReward: number;
  impressionReward: number;
  cap: number;
  endDate: number;
}

export interface WritePoolArgs {
  uri: string;
  details: WritePoolDetailsArgs;
  rewards: WritePoolRewardsArgs;
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
    args: [args.uri, args.details, args.rewards],
    overrides: {
      gasLimit: BigNumber.from(9999999),
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
          projectName: args.details.projectName,
          title: args.details.title,
          token: args.rewards.tokenAddress,
        },
      },
    });
  };

  useEffect(() => {
    if (enabled && args && typeof write === 'function') {
      write();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, args]);

  return {
    isError,
    isLoading,
    write,
    waitForTransaction,
  };
};

export default useContractCreatePool;
