import { useCallback, useMemo } from 'react';
import { BigNumber, ethers } from 'ethers';
import { useLoadingModals } from './useLoadingModals';
import { AddressType, NotificationType } from '../utils';
import { useContracts } from './useContracts';
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
  const { escrowContract } = useContracts();
  const { showLoading, hideLoadingModal, showNotificationModal } = useLoadingModals();
  const { address: payee } = useAccount();
  const { abi: erc20ABI } = ABIs.contracts.HypeToken;
  const provider = useProvider();

  const depositsOf = useCallback(
    async (poolId: string): Promise<DepositsOf> => {
      try {
        return await escrowContract!.depositsOf(payee, poolId);
      } catch (error: any) {
        console.log('Can`t fetch the deposits of: ', error?.message);
      }
    },
    [escrowContract, payee],
  );

  const claim = useCallback(
    async (
      args: ClaimArgs,
      successCallback: () => void,
    ): Promise<ethers.providers.TransactionReceipt> => {
      showLoading(['Please, sign the message...', 'Claiming rewards...']);
      try {
        const tx: ethers.providers.TransactionResponse = await escrowContract!.claim(
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
    [escrowContract, hideLoadingModal, showLoading, showNotificationModal],
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
        const tx: ethers.providers.TransactionResponse = await escrowContract!.deposit(
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
    [escrowContract, hideLoadingModal, showLoading, showNotificationModal],
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
        const contract = new ethers.Contract(tokenAddress, erc20ABI, provider);
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
    [provider, deposit, erc20ABI, hideLoadingModal, showLoading, showNotificationModal],
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
