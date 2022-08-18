import { ModalsActionsEnum, useModalsDispatch } from '../context';
import { NotificationType } from '../utils';

const useLoadingModals = () => {
  const dispatchModals = useModalsDispatch();

  const showLoading = (text?: string) => {
    dispatchModals({
      type: ModalsActionsEnum.SHOW_LOADING,
      payload: {
        open: true,
        title: 'Action required',
        text: text || 'Please, sign the message...',
      },
    });
  };

  const hideLoadingModal = () => {
    dispatchModals({
      type: ModalsActionsEnum.SHOW_LOADING,
      payload: {
        open: false,
        title: null,
        text: null,
      },
    });
  };

  const showErrorModal = (err: string) => {
    dispatchModals({
      type: ModalsActionsEnum.SHOW_NOTIFICATION,
      payload: {
        open: true,
        type: NotificationType.ERROR,
        message: [err],
      },
    });
  };

  return {
    showLoading,
    hideLoadingModal,
    showErrorModal,
  };
};

export default useLoadingModals;
