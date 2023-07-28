import { IModalsStore, TModalsAction } from './types';

export enum ModalsActionsEnum {
  SHOW_CARD_DETAILS = 'SHOW_CARD_DETAILS',
  SHOW_LOADING = 'SHOW_LOADING',
  SHOW_METAMASK_INFO = 'SHOW_METAMASK_INFO',
  SHOW_TELEGRAM_INFO = 'SHOW_TELEGRAM_INFO',
  SHOW_DISCONNECT_TELEGRAM = 'SHOW_DISCONNECT_TELEGRAM',
  SHOW_NOTIFICATION = 'SHOW_NOTIFICATION',
}

export const modalsInitialState: IModalsStore = {
  hypeDetails: {
    open: false,
    cardData: {
      id: null,
      projectName: null,
      title: null,
      description: null,
      projectDescription: null,
      campaignWord: null,
      network: null,
      creator: null,
      token: null,
      tokenAddress: null,
      cap: 0,
      impressionReward: 0,
      status: null,
      endDate: 0,
      startDate: 0,
      duration: null,
    },
  },
  loading: {
    open: false,
    title: null,
    text: null,
  },
  metamaskInfo: {
    open: false,
    title: null,
    text: null,
    message: null,
  },
  telegramInfo: {
    open: false,
    title: null,
    text: null,
    message: null,
  },
  disconnectTelegram: {
    open: false,
    title: null,
    text: null,
    username: null,
    onDisconnect: () => {},
  },
  notification: {
    open: false,
    type: null,
    message: null,
  },
};

export const hypeModalsReducer = (
  state = modalsInitialState,
  action: TModalsAction,
): IModalsStore => {
  switch (action.type) {
    case ModalsActionsEnum.SHOW_CARD_DETAILS:
      return { ...state, hypeDetails: action.payload };
    case ModalsActionsEnum.SHOW_LOADING:
      return { ...state, loading: action.payload };
    case ModalsActionsEnum.SHOW_METAMASK_INFO:
      return { ...state, metamaskInfo: action.payload };
    case ModalsActionsEnum.SHOW_TELEGRAM_INFO:
      return { ...state, telegramInfo: action.payload };
    case ModalsActionsEnum.SHOW_DISCONNECT_TELEGRAM:
      return { ...state, disconnectTelegram: action.payload };
    case ModalsActionsEnum.SHOW_NOTIFICATION:
      return { ...state, notification: action.payload };
  }
};
