import { IHypeModalsStore, THypeModalsAction } from './types';

export enum HypeModalsActionsEnum {
  SHOW_HYPE_DETAILS = 'SHOW_HYPE_DETAILS',
  SHOW_INFO = 'SHOW_INFO',
}

export const hypeModalsInitialState: IHypeModalsStore = {
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
  state = hypeModalsInitialState,
  action: THypeModalsAction,
): IHypeModalsStore => {
  switch (action.type) {
    case HypeModalsActionsEnum.SHOW_HYPE_DETAILS:
      return { ...state, hypeDetails: action.payload };
    case HypeModalsActionsEnum.SHOW_INFO:
      return { ...state, info: action.payload };
  }
};
