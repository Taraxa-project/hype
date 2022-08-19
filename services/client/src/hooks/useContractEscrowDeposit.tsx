import ABIs from '../abi';
import { utils } from 'ethers';
import { escrowAddress } from '../constants';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { useModalsDispatch } from '../context';
import useLoadingModals from './useLoadingModals';

const useContractEscrowDeposit = (
  spender: string,
  poolId: number,
  amount: number,
  tokenAddress: string,
) => {
  const { abi } = ABIs.contracts.DynamicEscrow;
  const hypeInterface = new utils.Interface(abi);
  const dispatchModals = useModalsDispatch();
  const { showLoading, hideLoadingModal, showErrorModal } = useLoadingModals();

  const { config } = usePrepareContractWrite({
    addressOrName: escrowAddress,
    contractInterface: hypeInterface,
    functionName: 'deposit',
    args: [spender, poolId, amount, tokenAddress],
    enabled: !!spender || !!poolId || !!amount || !!tokenAddress,
  });

  const { data, isError, isLoading, write } = useContractWrite({
    ...config,
    onMutate() {
      showLoading();
    },
    onSuccess(data: any) {
      console.log('Successfully called', data);
    },
    onError(error: any) {
      console.log('On error: ', error);
      hideLoadingModal();
      showErrorModal(error?.message);
    },
  });

  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
    // wait: poolData?.wait,
    onSuccess(transactionData) {
      hideLoadingModal();
      showSuccessModal();
    },
    onError(error) {
      console.log('Error', error);
      hideLoadingModal();
      showErrorModal(error?.message);
    },
    onSettled(data, error) {
      console.log('Settled', { data, error });
      hideLoadingModal();
    },
  });

  const showSuccessModal = () => {};

  return {
    data,
    isError,
    isLoading,
    write,
  };
};

export default useContractEscrowDeposit;
