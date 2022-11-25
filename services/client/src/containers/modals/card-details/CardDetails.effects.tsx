import { ModalsActionsEnum, useModalsDispatch, useModalsStore } from '../../../context';

export const useCardDetailsEffects = () => {
  const {
    hypeDetails: { open, cardData, isPrivate },
  } = useModalsStore();
  const dispatchModals = useModalsDispatch();

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
          projectDescription: null,
          word: null,
          network: null,
          creator: null,
          tokenName: null,
          tokenAddress: null,
          cap: 0,
          minReward: 0,
          impressionReward: 0,
          active: null,
          endDate: null,
        },
      },
    });
  };

  const onActivatePool = () => {
    console.log('On activate pool');
  };

  return {
    open,
    ...cardData,
    closeModal,
    onActivatePool,
    isPrivate,
  };
};
