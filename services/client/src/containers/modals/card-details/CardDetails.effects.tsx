import { ModalsActionsEnum, useModalsDispatch, useModalsStore } from '../../../context';

export const useCardDetailsEffects = () => {
  const {
    hypeDetails: { open, cardData },
  } = useModalsStore();
  const dispatchModals = useModalsDispatch();

  const {
    projectName,
    title,
    description,
    rewardsAddress,
    creatorAddress,
    pool,
    minReward,
    startDate,
    endDate,
  } = cardData;

  const closeModal = () => {
    dispatchModals({
      type: ModalsActionsEnum.SHOW_CARD_DETAILS,
      payload: {
        open: false,
        cardData: {
          projectName: null,
          title: null,
          description: null,
          creatorAddress: null,
          rewardsAddress: null,
          pool: 0,
          minReward: 0,
          startDate: null,
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
    rewardsAddress,
    creatorAddress,
    pool,
    minReward,
    startDate,
    endDate,
    closeModal,
  };
};
