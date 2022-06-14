import { TelegramLogo } from '../../../assets/icons/Telegram';
import Button from '../../../components/button/Button';
import { ModalContainer } from '../../../components/modals/modal-container/ModalContainer';
import { ModalTitleProps } from '../../../components/modals/modal-title/ModalTitle';
import Box from '../../../components/styles/Box';
import Text from '../../../components/styles/Text';
import { useTelegramInfoEffects } from './TelegramInfo.effects';

export const TelegramInfo = () => {
  const { open, title, text, message, closeModal } = useTelegramInfoEffects();

  const titleProps: ModalTitleProps = {
    title,
    close: closeModal,
  };
  return (
    <ModalContainer titleProps={titleProps} open={open} closeModal={closeModal}>
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
          {message && (
            <Box borderRadius="16px" py="2" px="4" backgroundColor="greys.10" mt="4">
              <Text fontWeight="600" fontSize="0.875rem" color="greys.11">
                {message}
              </Text>
            </Box>
          )}
        </Box>
        <Button
          variant="primary"
          style={{ width: '100%', maxWidth: '17.3rem', margin: '0 auto' }}
          autoFocus
          onClick={closeModal}
        >
          OK
        </Button>
      </Box>
    </ModalContainer>
  );
};
