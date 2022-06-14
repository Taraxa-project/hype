import { FC } from 'react';
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
}

export interface ModalContainerProps {
  titleProps: ModalTitleProps;
  open: boolean;
  closeModal: () => void;
  children?: React.ReactNode;
  modalAction?: ModalAction;
  showCancel?: boolean;
}

export const ModalContainer: FC<ModalContainerProps> = ({
  titleProps,
  children,
  open,
  closeModal,
  modalAction,
  showCancel,
}) => {
  return (
    <>
      {open && (
        <>
          <BackgroundHover show={open} />
          <StyledModal>
            <ModalTitle {...titleProps} />
            {children}
            <Box
              display="flex"
              flexDirection="column"
              width="100%"
              justifyContent="center"
              alignItems="center"
              gridGap="12px"
            >
              {modalAction && (
                <Button
                  type={modalAction.type || 'button'}
                  variant="primary"
                  size="full-width"
                  onClick={modalAction.onAction}
                  disabled={modalAction.disabled}
                >
                  {modalAction.name}
                </Button>
              )}
              {showCancel && (
                <Button variant="neutral" style={{ width: '100%' }} autoFocus onClick={closeModal}>
                  Cancel
                </Button>
              )}
            </Box>
          </StyledModal>
        </>
      )}
    </>
  );
};