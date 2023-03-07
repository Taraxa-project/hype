import { ModalContainer } from '../../../components/modals/modal-container/ModalContainer';
import { ModalTitleProps } from '../../../components/modals/modal-title/ModalTitle';
import Box from '../../../components/styles/Box';
import Text from '../../../components/styles/Text';
import LoadingSpinner from '../../../assets/icons/Spinner';
import { useLoadingModalEffects } from './LoadingModal.effects';

export const LoadingModal = () => {
  const { open, title, text, closeModal } = useLoadingModalEffects();

  const titleProps: ModalTitleProps = {
    title,
  };
  return (
    <ModalContainer
      titleProps={titleProps}
      closeOutside={false}
      open={open}
      closeModal={closeModal}
    >
      <Box display="flex" flexDirection="column" height="100%">
        {text && text.map((value: string) => (
          <Text key={value} fontWeight="600" fontSize="14px" color="greys.11">
            {value}
          </Text>
        ))}
        <Box display="flex" flex="1  1 auto" alignItems="center" justifyContent="center">
          <LoadingSpinner />
        </Box>
      </Box>
    </ModalContainer>
  );
};
