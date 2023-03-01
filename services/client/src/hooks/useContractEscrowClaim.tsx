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
  nonce: string;
}

export const useContractEscrowClaim = (
  args: ClaimArgs,
  enabled: boolean,
  successCallback: () => void,
) => {
  const { abi } = ABIs.contracts.DynamicEscrow;
  const [isWrite, setIsWrite] = useState<boolean>(false);
  const { showLoading, hideLoadingModal, showNotificationModal } = useLoadingModals();

  const { config } = usePrepareContractWrite({
    address: escrowAddress,
    abi,
    functionName: 'createPool',
    args: [args.receiver, args.poolId, args.amount, args.tokenAddress, args.nonce],
    overrides: {
      gasLimit: BigNumber.from(9999999),
    },
    enabled,
  });

  const { data, isError, isLoading, write } = useContractWrite({
    ...config,
    onMutate() {
      showLoading(['Please, sign the message...', 'Activating pool...']);
    },
    onSuccess(data: any) {
      // console.log('Successfully called', data);
    },
    onError(error: any) {
      console.log('On error: ', error);
      hideLoadingModal();
      showNotificationModal(NotificationType.ERROR, error?.message);
    },
  });

  useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      hideLoadingModal();
    },
    onError(error: any) {
      console.log('Error', error);
      hideLoadingModal();
      showNotificationModal(NotificationType.ERROR, error?.message);
    },
    onSettled(data, error) {
      hideLoadingModal();
      successCallback();
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
