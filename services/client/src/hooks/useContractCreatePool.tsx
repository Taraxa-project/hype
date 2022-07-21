import ABIs from '../abi';
import { utils } from 'ethers';
import { hypeAddress } from '../constants';
import { useContractWrite } from 'wagmi';
import { ModalsActionsEnum, useModalsDispatch } from '../context';
import { NotificationType } from '../utils';

const useContractCreatePool = () => {
  const { abi } = ABIs.contracts.HypePool;
  const hypeInterface = new utils.Interface(abi);
  const dispatchModals = useModalsDispatch();

  const { data, isError, isLoading, write } = useContractWrite({
    addressOrName: hypeAddress,
    contractInterface: hypeInterface,
    functionName: 'createPool',
    onSuccess(data) {
      console.log('Successfully minted Hype Pool', data);
      dispatchModals({
        type: ModalsActionsEnum.SHOW_NOTIFICATION,
        payload: {
          open: true,
          type: NotificationType.SUCCESS,
          message: 'Successfully minted Hype Pool',
        },
      });
    },
  });

  return {
    data,
    isError,
    isLoading,
    write,
  };
};

export default useContractCreatePool;
