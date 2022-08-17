import { ModalsActionsEnum, useModalsDispatch, useModalsStore } from '../../../context';

export const usePoolCreatedEffects = () => {
  const {
    poolCreated: { open, pool },
  } = useModalsStore();
  const dispatchModals = useModalsDispatch();

  const closeModal = () => {
    dispatchModals({
      type: ModalsActionsEnum.SHOW_POOL_CREATED,
      payload: {
        open: false,
        pool: null,
      },
    });
  };

  const onLockRewards = () => {
    console.log('Locking rewards!');
  };

  return {
    open,
    pool,
    closeModal,
    onLockRewards,
  };
};
