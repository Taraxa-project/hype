import { ModalsActionsEnum, useModalsDispatch } from '../../context';
import { NotificationType } from '../../utils';

// REMOVE THIS AFTER USING MODALS

export const ExampleCallModals = () => {
  const dispatchModals = useModalsDispatch();
  const callModalExample = () => {
    dispatchModals({
      type: ModalsActionsEnum.SHOW_CARD_DETAILS,
      payload: {
        open: true,
        cardData: {
          projectName: null,
          title: null,
          description: null,
          creatorAddress: null,
          rewardsAddress: null,
          pool: 0,
          minReward: 0,
          startDate: null,
          endDate: null,
        },
      },
    });
    dispatchModals({
      type: ModalsActionsEnum.SHOW_LOADING,
      payload: {
        open: true,
        title: 'Action required...',
        text: 'Please, sign the message',
      },
    });
    dispatchModals({
      type: ModalsActionsEnum.SHOW_METAMASK_INFO,
      payload: {
        open: true,
        title: 'Connect wallet',
        text: 'Please, consider browsing the app in Metamask app.',
        message: 'Metamask not available',
      },
    });
    dispatchModals({
      type: ModalsActionsEnum.SHOW_TELEGRAM_INFO,
      payload: {
        open: true,
        title: 'Connect telegram',
        text: 'Error',
        message: 'Username already registered',
      },
    });
    dispatchModals({
      type: ModalsActionsEnum.SHOW_DISCONNECT_TELEGRAM,
      payload: {
        open: true,
        title: 'Disconnect account',
        text: 'Are you sure you want to disconnect this account?',
        username: '@hyper123',
        onDisconnect: () => {
          console.log('Disconnected');
        },
      },
    });
    dispatchModals({
      type: ModalsActionsEnum.SHOW_NOTIFICATION,
      payload: {
        open: true,
        type: NotificationType.ERROR,
        message: ['Username already registered'],
      },
    });
  };
};
