import { useCallback, useMemo } from 'react';
import { BigNumber, ethers } from 'ethers';
import { useLoadingModals } from './useLoadingModals';
import { AddressType, NotificationType } from '../utils';
import { useContractEscrow } from './useContractEscrow';
import { useAccount, useProvider } from 'wagmi';
import ABIs from '../abi';

export interface ClaimArgs {
  receiver: string;
  poolId: string;
  amount: BigNumber;
  tokenAddress: string;
  nonce: number;
  hash: string;
}

export interface DepositsOf {
  poolId: string;
  weiAmount: BigNumber;
  tokenAddress: string;
}

export const useEscrow = () => {
  const { mainnetEscrow, browserEscrow } = useContractEscrow();
  const { showLoading, hideLoadingModal, showNotificationModal } = useLoadingModals();
  const { address: payee } = useAccount();
  const { abi: erc20ABI } = ABIs.contracts.HypeToken;
  const browserProvider = useProvider();

  const depositsOf = useCallback(
    async (poolId: string): Promise<DepositsOf> => {
      return await mainnetEscrow!.poolURI(payee, poolId);
    },
    [mainnetEscrow],
  );

  const claim = useCallback(
    async (
      args: ClaimArgs,
      successCallback: () => void,
    ): Promise<ethers.providers.TransactionReceipt> => {
      showLoading(['Please, sign the message...', 'Claiming rewards...']);
      try {
        const tx: ethers.providers.TransactionResponse = await browserEscrow!.claim(
          args.receiver,
          args.poolId,
          args.amount,
          args.tokenAddress,
          args.nonce,
          args.hash,
        );
        const response: ethers.providers.TransactionReceipt = await tx.wait();
        hideLoadingModal();
        successCallback();
        return response;
      } catch (error: any) {
        console.log('On error: ', error);
        hideLoadingModal();
        showNotificationModal(NotificationType.ERROR, error?.message);
      }
    },
    [browserEscrow],
  );

  const deposit = useCallback(
    async (
      spender: AddressType,
      poolId: string,
      amount: BigNumber,
      tokenAddress: string,
      successCallback: () => void,
    ): Promise<ethers.providers.TransactionReceipt> => {
      showLoading(['Please, sign the message...', 'Funding the pool...']);
      try {
        const tx: ethers.providers.TransactionResponse = await browserEscrow!.deposit(
          spender,
          poolId,
          amount,
          tokenAddress,
        );
        const response: ethers.providers.TransactionReceipt = await tx.wait();
        hideLoadingModal();
        successCallback();
        return response;
      } catch (error: any) {
        console.log('On error: ', error);
        hideLoadingModal();
        showNotificationModal(NotificationType.ERROR, error?.message);
      }
    },
    [browserEscrow],
  );

  const approve = useCallback(
    async (
      spender: string,
      poolId: string,
      amount: BigNumber,
      tokenAddress: AddressType,
      successCallback: () => void,
    ): Promise<ethers.providers.TransactionReceipt> => {
      showLoading([
        'Please, sign the message...',
        'You need to approve in order to deposit your funds',
      ]);
      try {
        const contract = new ethers.Contract(tokenAddress, erc20ABI, browserProvider);
        const tx: ethers.providers.TransactionResponse = await contract!.approve(spender, amount);
        const response: ethers.providers.TransactionReceipt = await tx.wait();
        hideLoadingModal();
        return await deposit(spender as AddressType, poolId, amount, tokenAddress, successCallback);
      } catch (error: any) {
        console.log('On error: ', error);
        hideLoadingModal();
        showNotificationModal(NotificationType.ERROR, error?.message);
      }
    },
    [browserEscrow],
  );

  return useMemo(
    () => ({
      depositsOf,
      claim,
      deposit,
      approve,
    }),
    [depositsOf, claim, deposit, approve],
  );
};
