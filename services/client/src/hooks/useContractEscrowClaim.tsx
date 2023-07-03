import ABIs from '../abi';
import { escrowAddress } from '../constants';
import { useContractWrite, useWaitForTransaction, usePrepareContractWrite } from 'wagmi';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { useLoadingModals } from './useLoadingModals';
import { NotificationType } from '../utils';

export interface ClaimArgs {
  receiver: string;
  poolId: string;
  amount: BigNumber;
  tokenAddress: string;
  nonce: number;
  hash: string;
}

export const useContractEscrowClaim = (
  args: ClaimArgs,
  enabled: boolean,
  successCallback: () => void,
  resetWriteContract: () => void,
) => {
  const { abi } = ABIs.contracts.DynamicEscrow;
  const [isWrite, setIsWrite] = useState<boolean>(false);
  const { showLoading, hideLoadingModal, showNotificationModal } = useLoadingModals();
  const { config } = usePrepareContractWrite({
    address: escrowAddress,
    abi,
    functionName: 'claim',
    args: [args.receiver, args.poolId, args.amount, args.tokenAddress, args.nonce, args.hash],
    overrides: {
      gasLimit: BigNumber.from(9999999),
    },
    enabled,
  });

  const { data, isError, isLoading, write } = useContractWrite({
    ...config,
    onMutate() {
      showLoading(['Please, sign the message...', 'Claiming rewards...']);
    },
    // onSuccess(data: any) {},
    onError(error: any) {
      console.log('On error: ', error);
      hideLoadingModal();
      showNotificationModal(NotificationType.ERROR, error?.message);
      resetWriteContract();
      setIsWrite(false);
    },
  });

  useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      hideLoadingModal();
      successCallback();
      setIsWrite(false);
    },
    onError(error: any) {
      console.log('Error', error);
      hideLoadingModal();
      showNotificationModal(NotificationType.ERROR, error?.message);
      resetWriteContract();
      setIsWrite(false);
    },
    onSettled(data, error) {
      hideLoadingModal();
    },
  });

  useEffect(() => {
    if (typeof write === 'function') {
      setIsWrite(true);
    }
  }, [write]);

  useEffect(() => {
    if (enabled && args && isWrite === true) {
      write();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, isWrite]);

  return {
    isError,
    isLoading,
  };
};
