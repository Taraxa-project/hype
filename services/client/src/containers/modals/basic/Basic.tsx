import { ModalContainer } from '../../../components/modals/modal-container/ModalContainer';
import { ModalTitleProps } from '../../../components/modals/modal-title/ModalTitle';
import { ModalsActionsEnum, useModalsDispatch, useModalsStore } from '../../../context';

export const Basic = () => {
  const {
    basic: { open, title, content },
  } = useModalsStore();
  const dispatchModals = useModalsDispatch();

  const closeModal = () => {
    dispatchModals({
      type: ModalsActionsEnum.SHOW_BASIC,
      payload: {
        open: false,
        title: null,
        content: null,
      },
    });
  };

  const titleProps: ModalTitleProps = {
    title: title,
    close: closeModal,
  };

  return (
    <ModalContainer titleProps={titleProps} open={open} closeModal={closeModal} height="auto">
      {content}
    </ModalContainer>
  );
};
