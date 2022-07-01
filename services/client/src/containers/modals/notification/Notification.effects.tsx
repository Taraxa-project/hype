import CheckMarkIcon from '../../../assets/icons/Check';
import CloseIcon from '../../../assets/icons/Close';
import InfoIcon from '../../../assets/icons/Info';
import { ModalsActionsEnum, useModalsDispatch, useModalsStore } from '../../../context';
import { theme } from '../../../theme';
import { ButtonVariant, NotificationType } from '../../../utils';

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

  const iconSize = '6rem';

  const getNotificationProps = (
    type: NotificationType,
  ): {
    closeButtonVariant: ButtonVariant;
    notificationIcon: JSX.Element;
  } => {
    switch (type) {
      case NotificationType.ERROR:
        return {
          closeButtonVariant: 'danger',
          notificationIcon: (
            <CloseIcon color={theme.colors.danger} width={iconSize} height={iconSize} />
          ),
        };
      case NotificationType.INFO:
        return {
          closeButtonVariant: 'secondary',
          notificationIcon: (
            <InfoIcon color={theme.colors.secondary} width={iconSize} height={iconSize} />
          ),
        };
      case NotificationType.SUCCESS:
        return {
          closeButtonVariant: 'success',
          notificationIcon: (
            <CheckMarkIcon color={theme.colors.success} width={iconSize} height={iconSize} />
          ),
        };
      default:
        return {
          closeButtonVariant: 'secondary',
          notificationIcon: (
            <InfoIcon color={theme.colors.secondary} width={iconSize} height={iconSize} />
          ),
        };
    }
  };

  const { closeButtonVariant, notificationIcon } = getNotificationProps(type);

  return {
    open,
    type,
    message,
    closeModal,
    closeButtonVariant,
    notificationIcon,
  };
};
