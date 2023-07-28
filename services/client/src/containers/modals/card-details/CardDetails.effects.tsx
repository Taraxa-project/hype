import { useNavigate } from 'react-router-dom';
import { ModalsActionsEnum, useModalsDispatch, useModalsStore } from '../../../context';
import { useTokenDetails } from '../../../hooks';

export const useCardDetailsEffects = () => {
  const {
    hypeDetails: { open, cardData, isPrivate },
  } = useModalsStore();
  const dispatchModals = useModalsDispatch();
  let navigate = useNavigate();
  const { tokenDecimals, tokenSymbol } = useTokenDetails(cardData);

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
          campaignWord: null,
          network: null,
          creator: null,
          token: null,
          tokenName: null,
          tokenAddress: null,
          cap: 0,
          impressionReward: 0,
          status: null,
          endDate: 0,
          startDate: 0,
          duration: null,
        },
      },
    });
  };

  const onRedirect = () => {
    navigate(`/pool/${cardData.id}`);
    closeModal();
  };

  const onParticipate = () => {
    navigate(`/participate`);
    closeModal();
  };

  return {
    open,
    ...cardData,
    closeModal,
    onRedirect,
    isPrivate,
    tokenDecimals,
    onParticipate,
    tokenSymbol,
  };
};
