import { FC } from 'react';
import { ButtonVariant } from '../../../utils';
import BackgroundHover from '../../background/HoverBackground.styled';
import Button from '../../button/Button';
import Box from '../../styles/Box';
import { ModalTitle, ModalTitleProps } from '../modal-title/ModalTitle';
import { StyledModal } from './ModalContainer.styled';

export interface ModalAction {
  name: string;
  type?: 'button' | 'reset' | 'submit';
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onAction?: (value?: any) => void;
  closeButtonVariant?: ButtonVariant;
}

export interface ModalContainerProps {
  titleProps: ModalTitleProps;
  open: boolean;
  closeModal: () => void;
  children?: React.ReactNode;
  modalAction?: ModalAction;
  showCancel?: boolean;
  closeOutside?: boolean;
}

export const ModalContainer: FC<ModalContainerProps> = ({
  titleProps,
  children,
  open,
  closeModal,
  modalAction,
  showCancel,
  closeOutside = true,
}) => {
  return (
    <>
      {open && (
        <div
          onClick={() => {
            closeOutside && closeModal();
          }}
        >
          <BackgroundHover show={open} />
          <StyledModal onClick={(e) => e.stopPropagation()}>
            <div>
              <ModalTitle {...titleProps} />
              <Box overflow="auto" height="100%">
              {children}
              </Box>
            </div>
            <Box
              display="flex"
              flexDirection="column"
              width="100%"
              justifyContent="center"
              alignItems="center"
              gridGap="12px"
              marginTop="1rem"
            >
              {modalAction && (
                <Button
                  type={modalAction.type || 'button'}
                  variant={modalAction.closeButtonVariant || 'secondary'}
                  size="full-width"
                  onClick={modalAction.onAction}
                  disabled={modalAction.disabled}
                >
                  {modalAction.name}
                </Button>
              )}
              {showCancel && (
                <Button
                  variant="secondary"
                  style={{ width: '100%' }}
                  autoFocus
                  onClick={closeModal}
                >
                  Cancel
                </Button>
              )}
            </Box>
          </StyledModal>
        </div>
      )}
    </>
  );
};
