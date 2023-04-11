import { TelegramLogo } from '../../../assets/icons/Telegram';
import {
  ModalAction,
  ModalContainer,
} from '../../../components/modals/modal-container/ModalContainer';
import { ModalTitleProps } from '../../../components/modals/modal-title/ModalTitle';
import Box from '../../../components/styles/Box';
import Text from '../../../components/styles/Text';
import { useDiconnectTelegramEffects } from './DisconnectTelegram.effects';

export const DisconnectTelegram = () => {
  const { open, title, text, username, onDisconnect, closeModal } = useDiconnectTelegramEffects();

  const titleProps: ModalTitleProps = {
    title,
    close: closeModal,
  };

  const modalActions: ModalAction[] = [{
    name: 'Yes, disconnect this account',
    onAction: () => {
      onDisconnect();
      closeModal();
    },
  }];

  return (
    <ModalContainer
      titleProps={titleProps}
      open={open}
      closeModal={closeModal}
      modalActions={modalActions}
      showCancel={true}
    >
      <Box display="flex" flexDirection="column" height="100%">
        <Text>{text}</Text>
        <Box
          display="flex"
          flex="1  1 auto"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <TelegramLogo />
          {username && (
            <Box borderRadius="10px" py="2" px="4" backgroundColor="greys.10" mt="4">
              <Text fontWeight="600" fontSize="0.875rem" color="greys.11">
                {username}
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    </ModalContainer>
  );
};
