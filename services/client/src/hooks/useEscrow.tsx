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
      return await mainnetEscrow!.depositsOf(payee, poolId);
    },
    [mainnetEscrow, payee],
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
          {
            gasLimit: BigNumber.from(9999999),
          },
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
    [browserEscrow, hideLoadingModal, showLoading, showNotificationModal],
  );

  const deposit = useCallback(
    async (
      spender: AddressType,
      poolId: string,
      amount: BigNumber,
      tokenAddress: string,
    ): Promise<ethers.providers.TransactionReceipt> => {
      showLoading(['Please, sign the message...', 'Funding the pool...']);
      try {
        const tx: ethers.providers.TransactionResponse = await browserEscrow!.deposit(
          spender,
          poolId,
          amount,
          tokenAddress,
          {
            from: spender,
            gasLimit: BigNumber.from(9999999),
            value: amount,
          },
        );
        const response: ethers.providers.TransactionReceipt = await tx.wait();
        hideLoadingModal();
        return response;
      } catch (error: any) {
        console.log('On error: ', error);
        hideLoadingModal();
        showNotificationModal(NotificationType.ERROR, error?.message);
      }
    },
    [browserEscrow, hideLoadingModal, showLoading, showNotificationModal],
  );

  const approve = useCallback(
    async (
      spender: string,
      poolId: string,
      amount: BigNumber,
      tokenAddress: AddressType,
    ): Promise<ethers.providers.TransactionReceipt> => {
      showLoading([
        'Please, sign the message...',
        'You need to approve in order to deposit your funds',
      ]);
      try {
        const contract = new ethers.Contract(tokenAddress, erc20ABI, browserProvider);
        const tx: ethers.providers.TransactionResponse = await contract!.approve(spender, amount);
        await tx.wait();
        hideLoadingModal();
        return await deposit(spender as AddressType, poolId, amount, tokenAddress);
      } catch (error: any) {
        console.log('On error: ', error);
        hideLoadingModal();
        showNotificationModal(NotificationType.ERROR, error?.message);
      }
    },
    [browserProvider, deposit, erc20ABI, hideLoadingModal, showLoading, showNotificationModal],
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
