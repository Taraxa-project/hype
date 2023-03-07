import {
  ModalAction,
  ModalContainer,
} from '../../../components/modals/modal-container/ModalContainer';
import { ModalTitleProps } from '../../../components/modals/modal-title/ModalTitle';
import Box from '../../../components/styles/Box';
import Text from '../../../components/styles/Text';
import { useNotificationEffects } from './Notification.effects';

export const Notification = () => {
  const { open, type, message, closeModal, notificationIcon, title } = useNotificationEffects();

  const titleProps: ModalTitleProps = {
    title: title || type,
    close: closeModal,
    icon: notificationIcon,
  };

  const modalActions: ModalAction[] = [{
    name: 'OK',
    onAction: closeModal,
    closeButtonVariant: 'primary',
    maxWidth: '17rem',
  }];

  return (
    <ModalContainer
      titleProps={titleProps}
      open={open}
      closeModal={closeModal}
      modalActions={modalActions}
      height="20rem"
    >
      <Box display="flex" flexDirection="column" gridGap="1rem">
        {message?.map((text: string) => (
          <Text key={text} fontWeight="600" fontSize="14px" color="greys.11">
            {text}
          </Text>
        ))}
      </Box>
    </ModalContainer>
  );
};
