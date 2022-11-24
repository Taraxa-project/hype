import { ModalsActionsEnum, useModalsDispatch, useModalsStore } from '../../../context';

export const useCardDetailsEffects = () => {
  const {
    hypeDetails: { open, cardData, isPrivate },
  } = useModalsStore();
  const dispatchModals = useModalsDispatch();

  const {
    id,
    projectName,
    title,
    description,
    projectDescription,
    tokenName,
    word,
    network,
    tokenAddress,
    creator,
    cap,
    minReward,
    impressionReward,
    active,
    endDate,
  } = cardData;

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
    id,
    projectName,
    title,
    description,
    projectDescription,
    tokenAddress,
    tokenName,
    word,
    network,
    creator,
    cap,
    minReward,
    impressionReward,
    active,
    endDate,
    closeModal,
    onActivatePool,
    isPrivate,
  };
};
