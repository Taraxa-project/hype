import { ModalsActionsEnum, useModalsDispatch, useModalsStore } from '../../../context';

export const useCardDetailsEffects = () => {
  const {
    hypeDetails: { open, cardData },
  } = useModalsStore();
  const dispatchModals = useModalsDispatch();

  const {
    title,
    creatorAddress,
    description,
    pool,
    poolToken,
    bonus,
    bonusToken,
    minReward,
    rewardToken,
    duration,
  } = cardData;

  const closeModal = () => {
    dispatchModals({
      type: ModalsActionsEnum.SHOW_CARD_DETAILS,
      payload: {
        open: false,
        cardData: {
          pool: 0,
          poolToken: '',
          bonus: 0,
          bonusToken: '',
          minReward: 0,
          creatorAddress: '',
          rewardToken: '',
        },
      },
    });
  };

  return {
    open,
    title,
    creatorAddress,
    description,
    pool,
    poolToken,
    bonus,
    bonusToken,
    minReward,
    rewardToken,
    duration,
    closeModal,
  };
};
