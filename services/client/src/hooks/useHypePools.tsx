import { useCallback, useMemo } from 'react';
import { useContractPools } from './useContractPools';
import { BigNumber, ethers } from 'ethers';
import { HypePool } from '../models';
import { useLoadingModals } from './useLoadingModals';
import { NotificationType } from '../utils';
import ABIs from '../abi';

export interface WritePoolDetailsArgs {
  title: string;
  projectName: string;
  tokenName?: string;
  word: string;
}

export interface WritePoolRewardsArgs {
  network: number;
  tokenAddress: string;
  impressionReward: BigNumber;
  cap: BigNumber;
  endDate: number;
  startDate: number;
  duration: number;
}

export interface WritePoolArgs {
  uri: string;
  details: WritePoolDetailsArgs;
  rewards: WritePoolRewardsArgs;
}

export const useHypePools = () => {
  const { mainnetHype, browserHype } = useContractPools();
  const { showLoading, hideLoadingModal, showNotificationModal } = useLoadingModals();
  const { abi } = ABIs.contracts.HypePool;

  const getPool = useCallback(
    async (tokenId: BigNumber): Promise<HypePool> => {
      return await mainnetHype!.getPool(tokenId);
    },
    [mainnetHype],
  );

  const getPoolUri = useCallback(
    async (tokenId: BigNumber): Promise<HypePool> => {
      return await mainnetHype!.poolURI(tokenId);
    },
    [mainnetHype],
  );

  const createPool = useCallback(
    async (
      args: WritePoolArgs,
      successCallback: () => void,
      setCreatedPoolIndex: (index: string) => void,
      setPoolTransaction: (tx: string) => void,
    ): Promise<ethers.providers.TransactionReceipt> => {
      showLoading(['Please, sign the message...', 'Creating your Hype Pool on-chain...']);
      try {
        const poolTx: ethers.providers.TransactionResponse = await browserHype!.createPool(
          args.uri,
          args.details,
          args.rewards,
        );
        const response: ethers.providers.TransactionReceipt = await poolTx.wait();
        if (response.transactionHash) {
          setPoolTransaction(response.transactionHash);
        }
        const hypeI = new ethers.utils.Interface(abi);
        const poolCreatedEvent = hypeI.parseLog(
          response.logs.filter((event: any) => hypeI.parseLog(event)?.name === 'PoolCreated')[0],
        );
        if (poolCreatedEvent && poolCreatedEvent.args[0]) {
          setCreatedPoolIndex(poolCreatedEvent.args[0]);
        }
        hideLoadingModal();
        successCallback();
        return response;
      } catch (error: any) {
        hideLoadingModal();
        showNotificationModal(NotificationType.ERROR, error?.message);
      }
    },
    [browserHype],
  );

  const activatePool = useCallback(
    async (
      id: string,
      successCallback: () => void,
    ): Promise<ethers.providers.TransactionReceipt> => {
      showLoading(['Please, sign the message...', 'Activating pool...']);
      try {
        const poolTx: ethers.providers.TransactionResponse = await browserHype!.activatePool(id);
        const response: ethers.providers.TransactionReceipt = await poolTx.wait();
        hideLoadingModal();
        successCallback();
        return response;
      } catch (error: any) {
        hideLoadingModal();
        showNotificationModal(NotificationType.ERROR, error?.message);
      }
    },
    [browserHype],
  );

  return useMemo(
    () => ({
      createPool,
      getPoolUri,
      getPool,
      activatePool,
    }),
    [createPool, getPoolUri, getPool, activatePool],
  );
};
