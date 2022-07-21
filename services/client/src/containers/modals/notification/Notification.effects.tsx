import ErrorIcon from '../../../assets/icons/Error';
import InfoIcon from '../../../assets/icons/Info';
import SuccessIcon from '../../../assets/icons/Success';
import { ModalsActionsEnum, useModalsDispatch, useModalsStore } from '../../../context';
import { NotificationType } from '../../../utils';

export const useNotificationEffects = () => {
  const {
    notification: { open, type, message },
  } = useModalsStore();
  const dispatchModals = useModalsDispatch();

  const closeModal = () => {
    dispatchModals({
      type: ModalsActionsEnum.SHOW_NOTIFICATION,
      payload: {
        open: false,
        type: null,
        message: null,
      },
    });
  };

  const iconSize = '20px';

  const getNotificationProps = (
    type: NotificationType,
  ): {
    notificationIcon: JSX.Element;
  } => {
    switch (type) {
      case NotificationType.ERROR:
        return {
          notificationIcon: <ErrorIcon width={iconSize} height={iconSize} />,
        };
      case NotificationType.INFO:
        return {
          notificationIcon: <InfoIcon width={iconSize} height={iconSize} />,
        };
      case NotificationType.SUCCESS:
        return {
          notificationIcon: <SuccessIcon width={iconSize} height={iconSize} />,
        };
      default:
        return {
          notificationIcon: <InfoIcon width={iconSize} height={iconSize} />,
        };
    }
  };

  const { notificationIcon } = getNotificationProps(type);

  return {
    open,
    type,
    message,
    closeModal,
    notificationIcon,
  };
};
