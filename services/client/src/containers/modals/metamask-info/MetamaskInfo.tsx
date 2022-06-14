import { MetamaskLogo } from '../../../assets/icons/Metamask';
import Button from '../../../components/button/Button';
import { ModalContainer } from '../../../components/modals/modal-container/ModalContainer';
import { ModalTitleProps } from '../../../components/modals/modal-title/ModalTitle';
import Box from '../../../components/styles/Box';
import Text from '../../../components/styles/Text';
import { useMetamaskInfoEffects } from './MetamaskInfo.effects';

export const MetamaskInfo = () => {
  const { open, title, text, message, closeModal } = useMetamaskInfoEffects();

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
          <MetamaskLogo />
          {message && (
            <Box borderRadius="16px" py="2" px="5" backgroundColor="greys.10">
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
