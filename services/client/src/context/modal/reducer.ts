import { IModalsStore, TModalsAction } from './types';

export enum ModalsActionsEnum {
  SHOW_CARD_DETAILS = 'SHOW_CARD_DETAILS',
  SHOW_LOADING = 'SHOW_LOADING',
  SHOW_METAMASK_INFO = 'SHOW_METAMASK_INFO',
  SHOW_TELEGRAM_INFO = 'SHOW_TELEGRAM_INFO',
}

export const modalsInitialState: IModalsStore = {
  hypeDetails: {
    open: false,
    cardData: {
      pool: 0,
      poolToken: '',
      bonus: 0,
      bonusToken: '',
      minReward: 0,
      creatorAddress: '',
      rewardToken: '',
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
  }
};
