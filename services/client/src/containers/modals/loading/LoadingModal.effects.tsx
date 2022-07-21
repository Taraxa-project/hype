import { ModalsActionsEnum, useModalsDispatch, useModalsStore } from '../../../context';

export const useLoadingModalEffects = () => {
  const {
    loading: { open, title, text },
  } = useModalsStore();
  const dispatchModals = useModalsDispatch();

  const closeModal = () => {
    dispatchModals({
      type: ModalsActionsEnum.SHOW_LOADING,
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
    closeModal,
  };
};
