import { ModalsActionsEnum, useModalsDispatch, useModalsStore } from '../../../context';

export const useCardDetailsEffects = () => {
  const {
    hypeDetails: { open, cardData },
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
    closeModal,
  };
};
