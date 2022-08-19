import ABIs from '../abi';
import { utils } from 'ethers';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { useModalsDispatch } from '../context';
import useLoadingModals from './useLoadingModals';

const useContractERC20Approve = (
  spender: string,
  poolId: number,
  amount: number,
  tokenAddress: string,
) => {
  const { abi } = ABIs.contracts.HypeToken;
  const hypeInterface = new utils.Interface(abi);
  const dispatchModals = useModalsDispatch();
  const { showLoading, hideLoadingModal, showErrorModal } = useLoadingModals();

  const { config } = usePrepareContractWrite({
    addressOrName: tokenAddress,
    contractInterface: hypeInterface,
    functionName: 'approve',
    args: [spender, amount],
    overrides: {
      gasLimit: 9999999,
    },
    enabled: !!spender || !!amount,
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

  console.log('waitForTransaction: ', waitForTransaction);

  const showSuccessModal = () => {};

  return {
    data,
    isError,
    isLoading,
    write,
  };
};

export default useContractERC20Approve;
