import { ModalsActionsEnum, useModalsDispatch, useModalsStore } from '../../../context';

export const useMetamaskInfoEffects = () => {
  const {
    metamaskInfo: { open, title, text, message },
  } = useModalsStore();
  const dispatchModals = useModalsDispatch();

  const closeModal = () => {
    dispatchModals({
      type: ModalsActionsEnum.SHOW_METAMASK_INFO,
      payload: {
        open: false,
        title,
        text,
      },
    });
  };

  return {
    open,
    title,
    text,
    message,
    closeModal,
  };
};
