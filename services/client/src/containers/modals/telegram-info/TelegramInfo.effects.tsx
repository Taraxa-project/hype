import { ModalsActionsEnum, useModalsDispatch, useModalsStore } from '../../../context';

export const useTelegramInfoEffects = () => {
  const {
    telegramInfo: { open, title, text, message },
  } = useModalsStore();
  const dispatchModals = useModalsDispatch();

  const closeModal = () => {
    dispatchModals({
      type: ModalsActionsEnum.SHOW_TELEGRAM_INFO,
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
