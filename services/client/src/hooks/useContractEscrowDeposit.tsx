import ABIs from '../abi';
import { escrowAddress } from '../constants';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import useLoadingModals from './useLoadingModals';
import { NotificationType } from '../utils';

const useContractEscrowDeposit = (
  spender: string,
  poolId: number,
  amount: number,
  tokenAddress: string,
) => {
  console.log('spender: ', spender);
  console.log('poolId: ', poolId);
  console.log('amount: ', amount);
  console.log('tokenAddress: ', tokenAddress);
  const { abi } = ABIs.contracts.DynamicEscrow;
  const { showLoading, hideLoadingModal, showNotificationModal } = useLoadingModals();

  const { config } = usePrepareContractWrite({
    address: escrowAddress,
    abi,
    functionName: 'deposit',
    args: [spender, poolId, amount, tokenAddress],
    enabled: !!spender || !!poolId || !!amount || !!tokenAddress,
    overrides: {
      from: spender as `0x${string}`,
      // gasLimit: 9999999,
      // value: ethers.utils.parseEther(amount?.toString()),
    },
  });

  const { data, isError, isLoading, write } = useContractWrite({
    ...config,
    onMutate() {
      showLoading(['Please, sign the message...', 'Depositing rewards...']);
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
      console.log('Success', transactionData);
      hideLoadingModal();
      showNotificationModal(NotificationType.SUCCESS, 'Funds successfully deposited');
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

  return {
    data,
    isError,
    isLoading,
    write,
  };
};

export default useContractEscrowDeposit;
