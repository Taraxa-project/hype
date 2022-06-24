import {
  ModalAction,
  ModalContainer,
} from '../../../components/modals/modal-container/ModalContainer';
import { ModalTitleProps } from '../../../components/modals/modal-title/ModalTitle';
import Box from '../../../components/styles/Box';
import Text from '../../../components/styles/Text';
import { useNotificationEffects } from './Notification.effects';

export const Notification = () => {
  const { open, type, message, closeModal, closeButtonVariant, notificationIcon } =
    useNotificationEffects();

  const titleProps: ModalTitleProps = {
    title: type,
    close: closeModal,
  };

  const modalAction: ModalAction = {
    name: 'OK',
    onAction: closeModal,
    closeButtonVariant,
  };

  return (
    <ModalContainer
      titleProps={titleProps}
      open={open}
      closeModal={closeModal}
      modalAction={modalAction}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
        gridGap="2rem"
      >
        {notificationIcon}
        <Text>{message}</Text>
      </Box>
    </ModalContainer>
  );
};
