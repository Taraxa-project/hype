import ABIs from '../abi';
import { hypeAddress } from '../constants';
import { useContractWrite, useWaitForTransaction, usePrepareContractWrite } from 'wagmi';
import { useEffect } from 'react';
import { useLoadingModals } from './useLoadingModals';
import { NotificationType } from '../utils';
import { BigNumber, ethers } from 'ethers';

export interface WritePoolDetailsArgs {
  title: string;
  projectName: string;
  tokenName?: string;
  word: string;
}

export interface WritePoolRewardsArgs {
  network: number;
  tokenAddress: string;
  minReward: BigNumber;
  impressionReward: BigNumber;
  cap: BigNumber;
  endDate: number;
}

export interface WritePoolArgs {
  uri: string;
  details: WritePoolDetailsArgs;
  rewards: WritePoolRewardsArgs;
}

export const useContractCreatePool = (
  args: WritePoolArgs,
  enabled: boolean,
  resetWriteContract: () => void,
  successCallback: () => void,
  setCreatedPoolIndex: (index: BigNumber) => void,
  setPoolTransaction: (tx: string) => void,
) => {
  const { abi } = ABIs.contracts.HypePool;
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

  const { data: poolData, isError, isLoading, write } = useContractWrite({
    ...config,
    onMutate() {
      showLoading(['Please, sign the message...', 'Creating your Hype Pool on-chain...']);
    },
    onError(error: any) {
      console.log('onError: ', error);
      hideLoadingModal();
      showNotificationModal(NotificationType.ERROR, error?.message);
      resetWriteContract();
    },
  });

  useWaitForTransaction({
    hash: poolData?.hash,
    onSuccess(transactionData) {
      // console.log('onSuccess', transactionData);
      hideLoadingModal();
      successCallback();
      resetWriteContract();
    },
    onError(error: any) {
      console.log('onError', error);
      hideLoadingModal();
      showNotificationModal(NotificationType.ERROR, error?.message);
      resetWriteContract();
    },
    onSettled(data, error) {
      if (data.transactionHash) {
        setPoolTransaction(data.transactionHash);
      }
      const hypeI = new ethers.utils.Interface(abi);
      const poolCreatedEvent = hypeI.parseLog(
        data.logs.filter(event => hypeI.parseLog(event)?.name === 'PoolCreated')[0],
      );
      if (poolCreatedEvent && poolCreatedEvent.args[0]) {
        setCreatedPoolIndex(poolCreatedEvent.args[0]);
      }
      hideLoadingModal();
    },
  });

  useEffect(() => {
    if (enabled && args && typeof write === 'function') {
      write();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, args]);

  return {
    isError,
    isLoading,
  };
};
