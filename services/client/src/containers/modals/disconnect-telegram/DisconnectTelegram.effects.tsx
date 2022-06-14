import { ModalsActionsEnum, useModalsDispatch, useModalsStore } from '../../../context';

export const useDiconnectTelegramEffects = () => {
  const {
    disconnectTelegram: { open, title, text, username, onDisconnect },
  } = useModalsStore();
  const dispatchModals = useModalsDispatch();

  const closeModal = () => {
    dispatchModals({
      type: ModalsActionsEnum.SHOW_DISCONNECT_TELEGRAM,
      payload: {
        open: false,
        title: null,
        text: null,
        username: null,
        onDisconnect: () => {},
      },
    });
  };

  return {
    open,
    title,
    text,
    username,
    onDisconnect,
    closeModal,
  };
};
