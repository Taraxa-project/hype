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
  maxWidth?: string;
}

export interface ModalContainerProps {
  titleProps: ModalTitleProps;
  open: boolean;
  closeModal: () => void;
  children?: React.ReactNode;
  modalAction?: ModalAction;
  showCancel?: boolean;
  cancelButtonText?: string;
  closeOutside?: boolean;
  height?: string;
}

export const ModalContainer: FC<ModalContainerProps> = ({
  titleProps,
  children,
  open,
  closeModal,
  modalAction,
  showCancel,
  cancelButtonText,
  closeOutside = true,
  height,
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
          <StyledModal props={{ height }} onClick={(e) => e.stopPropagation()}>
            <Box>
              <ModalTitle {...titleProps} />
              <Box overflow="auto" height="100%">
                {children}
              </Box>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              width="100%"
              justifyContent="center"
              alignItems="center"
              gridGap="0.75rem"
              margin="0 auto"
              marginTop="1rem"
              maxWidth={modalAction?.maxWidth || '23rem'}
            >
              {modalAction && (
                <Button
                  type={modalAction.type || 'button'}
                  variant={modalAction.closeButtonVariant || 'primary'}
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
                  {cancelButtonText || 'Cancel'}
                </Button>
              )}
            </Box>
          </StyledModal>
        </div>
      )}
    </>
  );
};
