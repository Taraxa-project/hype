import ABIs from '../abi';
import { utils } from 'ethers';
import { hypeAddress } from '../constants';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { ModalsActionsEnum, useModalsDispatch } from '../context';
import { NotificationType } from '../utils';

const useContractCreatePool = () => {
  const { abi } = ABIs.contracts.HypePool;
  const hypeInterface = new utils.Interface(abi);
  const dispatchModals = useModalsDispatch();

  const {
    data: mintedPool,
    isError,
    isLoading,
    write,
  } = useContractWrite({
    addressOrName: hypeAddress,
    contractInterface: hypeInterface,
    functionName: 'createPool',
  });

  useWaitForTransaction({
    hash: mintedPool?.hash,
    onSuccess(data) {
      // console.log('Successfully minted Hype Pool data', data);
      // console.log('Successfully minted Hype Pool mintedPool', mintedPool );
      dispatchModals({
        type: ModalsActionsEnum.SHOW_LOADING,
        payload: {
          open: false,
          title: null,
          text: null,
        },
      });
      dispatchModals({
        type: ModalsActionsEnum.SHOW_NOTIFICATION,
        payload: {
          open: true,
          type: NotificationType.SUCCESS,
          message: 'Successfully minted Hype Pool',
        },
      });
    },
    onError(error) {
      console.log('Error', error);
    },
    onSettled(data, error) {
      console.log('Settled', { data, error });
    },
  });

  return {
    isError,
    isLoading,
    write,
  };
};

export default useContractCreatePool;
