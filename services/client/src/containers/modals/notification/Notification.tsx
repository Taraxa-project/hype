import {
  ModalAction,
  ModalContainer,
} from '../../../components/modals/modal-container/ModalContainer';
import { ModalTitleProps } from '../../../components/modals/modal-title/ModalTitle';
import Box from '../../../components/styles/Box';
import Text from '../../../components/styles/Text';
import { useNotificationEffects } from './Notification.effects';

export const Notification = () => {
  const { open, type, message, closeModal, notificationIcon } = useNotificationEffects();

  const titleProps: ModalTitleProps = {
    title: type,
    close: closeModal,
    icon: notificationIcon,
  };

  const modalAction: ModalAction = {
    name: 'OK',
    onAction: closeModal,
    closeButtonVariant: 'primary',
    maxWidth: '17rem',
  };

  return (
    <ModalContainer
      titleProps={titleProps}
      open={open}
      closeModal={closeModal}
      modalAction={modalAction}
      height="23rem"
    >
      <Box>
        <Text fontWeight="600" fontSize="14px" color="greys.11">
          {message}
        </Text>
      </Box>
    </ModalContainer>
  );
};
