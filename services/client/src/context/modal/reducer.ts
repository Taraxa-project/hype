import { IModalsStore, TModalsAction } from './types';

export enum ModalsActionsEnum {
  SHOW_CARD_DETAILS = 'SHOW_CARD_DETAILS',
  SHOW_INFO = 'SHOW_INFO',
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
  info: {
    open: false,
    title: null,
    text: null,
  },
};

export const hypeModalsReducer = (
  state = modalsInitialState,
  action: TModalsAction,
): IModalsStore => {
  switch (action.type) {
    case ModalsActionsEnum.SHOW_CARD_DETAILS:
      return { ...state, hypeDetails: action.payload };
    case ModalsActionsEnum.SHOW_INFO:
      return { ...state, info: action.payload };
  }
};
