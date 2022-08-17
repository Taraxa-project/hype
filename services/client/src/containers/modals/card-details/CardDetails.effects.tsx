import { ModalsActionsEnum, useModalsDispatch, useModalsStore } from '../../../context';

export const useCardDetailsEffects = () => {
  const {
    hypeDetails: { open, cardData, cardModalAction },
  } = useModalsStore();
  const dispatchModals = useModalsDispatch();

  const { projectName, title, description, token, creator, cap, minReward, active, endDate } =
    cardData;

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

  return {
    open,
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
