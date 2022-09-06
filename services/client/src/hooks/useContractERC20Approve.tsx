import ABIs from '../abi';
import { utils } from 'ethers';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import useLoadingModals from './useLoadingModals';
import useContractEscrowDeposit from './useContractEscrowDeposit';
import { NotificationType } from '../utils';

const useContractERC20Approve = (
  spender: string,
  poolId: number,
  amount: number,
  tokenAddress: string,
) => {
  const { abi } = ABIs.contracts.HypeToken;
  const contractInterface = new utils.Interface(abi);
  const { showLoading, hideLoadingModal, showNotificationModal } = useLoadingModals();
  const { write: deposit } = useContractEscrowDeposit(spender, poolId, amount, tokenAddress);

  const { config } = usePrepareContractWrite({
    addressOrName: tokenAddress,
    contractInterface: contractInterface,
    functionName: 'approve',
    args: [spender, amount],
    overrides: {
      gasLimit: 9999999,
    },
    enabled: !!spender || !!poolId || !!amount || !!tokenAddress,
  });

  const { data, isError, isLoading, write } = useContractWrite({
    ...config,
    onMutate() {
      showLoading([
        'Please, sign the message...',
        'You need to approve in order to deposit your funds',
      ]);
    },
    onSuccess(data: any) {
      console.log('Successfully called', data);
    },
    onError(error: any) {
      console.log('On error: ', error);
      hideLoadingModal();
      showNotificationModal(NotificationType.ERROR, error?.message);
    },
  });

  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
    wait: data?.wait,
    onSuccess(transactionData) {
      hideLoadingModal();
      deposit();
      console.log('Success', transactionData);
    },
    onError(error: any) {
      console.log('Error', error);
      hideLoadingModal();
      showNotificationModal(NotificationType.ERROR, error?.message);
    },
    onSettled(data, error) {
      console.log('Settled', { data, error });
      hideLoadingModal();
    },
  });

  console.log('waitForTransaction: ', waitForTransaction);

  return {
    data,
    isError,
    isLoading,
    write,
  };
};

export default useContractERC20Approve;
