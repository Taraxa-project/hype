import { useCallback, useMemo } from 'react';
import { useContracts } from './useContracts';
import { BigNumber, ethers } from 'ethers';
import { HypePool } from '../models';
import { useLoadingModals } from './useLoadingModals';
import { NotificationType } from '../utils';
import ABIs from '../abi';

export interface WritePoolDetailsArgs {
  title: string;
  projectName: string;
  tokenName?: string;
  campaignWord: string;
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
  leaderRewards: BigNumber[];
}

export const useHypePools = () => {
  const { hypeContract } = useContracts();
  const { showLoading, hideLoadingModal, showNotificationModal } = useLoadingModals();
  const { abi } = ABIs.contracts.HypePool;

  const getPool = useCallback(
    async (poolId: string): Promise<HypePool> => {
      return await hypeContract!.getPool(poolId);
    },
    [hypeContract],
  );

  const getPoolUri = useCallback(
    async (poolId: string): Promise<HypePool> => {
      return await hypeContract!.poolURI(poolId);
    },
    [hypeContract],
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
        const poolTx: ethers.providers.TransactionResponse = await hypeContract!.createPool(
          args.uri,
          args.details,
          args.rewards,
          args.leaderRewards,
        );
        const response: ethers.providers.TransactionReceipt = await poolTx.wait();
        if (response?.transactionHash) {
          setPoolTransaction(response.transactionHash);
        }
        const hypeI = new ethers.utils.Interface(abi);
        const poolCreatedEvent = hypeI.parseLog(
          response?.logs?.filter((event: any) => hypeI.parseLog(event)?.name === 'PoolCreated')[0],
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
        throw error;
      }
    },
    [abi, hideLoadingModal, hypeContract, showLoading, showNotificationModal],
  );

  const activatePool = useCallback(
    async (
      id: string,
      successCallback: () => void,
    ): Promise<ethers.providers.TransactionReceipt> => {
      showLoading(['Please, sign the message...', 'Activating pool...']);
      try {
        const poolTx: ethers.providers.TransactionResponse = await hypeContract!.activatePool(id);
        const response: ethers.providers.TransactionReceipt = await poolTx.wait();
        hideLoadingModal();
        successCallback();
        return response;
      } catch (error: any) {
        hideLoadingModal();
        showNotificationModal(NotificationType.ERROR, error?.message);
        throw error;
      }
    },
    [hideLoadingModal, hypeContract, showLoading, showNotificationModal],
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
