import { ModalAction } from '../../../components/modals/modal-container/ModalContainer';
import { ModalsActionsEnum, useModalsDispatch, useModalsStore } from '../../../context';
import useContractActivatePool from '../../../hooks/useContractActivatePool';
import useContractERC20Approve from '../../../hooks/useContractERC20Approve';
import useContractEscrowDeposit from '../../../hooks/useContractEscrowDeposit';

export const useCardDetailsEffects = () => {
  const {
    hypeDetails: { open, cardData, cardModalAction },
  } = useModalsStore();
  const dispatchModals = useModalsDispatch();

  const { id, projectName, title, description, token, creator, cap, minReward, active, endDate } =
    cardData;
  // const { data, isError, isLoading, write } = useContractERC20Approve(creator, id, cap, token);
  // const { data, isError, isLoading, write } = useContractEscrowDeposit(creator, id, cap, token);
  // const { data, isError, isLoading, write } = useContractActivatePool(id);

  const closeModal = () => {
    dispatchModals({
      type: ModalsActionsEnum.SHOW_CARD_DETAILS,
      payload: {
        open: false,
        cardData: {
          id: null,
          projectName: null,
          title: null,
          description: null,
          creator: null,
          token: null,
          cap: 0,
          minReward: 0,
          active: null,
          endDate: null,
        },
      },
    });
  };

  // const onModalAction = () => {
  //   // closeModal();
  //   write();
  // }

  // const modalAction: ModalAction = {
  //   name: 'Deposit rewards',
  //   onAction: onModalAction,
  //   closeButtonVariant: 'primary',
  // }

  return {
    open,
    id,
    projectName,
    title,
    description,
    token,
    creator,
    cap,
    minReward,
    active,
    endDate,
    cardModalAction,
    closeModal,
  };
};
