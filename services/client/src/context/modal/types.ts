import { CardData } from '../../components/card/Card';
import { ModalsActionsEnum } from './reducer';

export type TCardDetails = {
  open: boolean;
  cardData: CardData;
};

export type TLoading = {
  open: boolean;
  title: string;
  text: string;
  onClose?: () => void;
};

export type TMetamaskInfo = {
  open: boolean;
  title: string;
  text: string;
  message?: string;
};

export type TTelegramInfo = {
  open: boolean;
  title: string;
  text: string;
  message?: string;
};

export interface IModalsStore {
  hypeDetails: TCardDetails;
  loading: TLoading;
  metamaskInfo: TMetamaskInfo;
  telegramInfo: TTelegramInfo;
}

interface ICardDetailsAction {
  type: ModalsActionsEnum.SHOW_CARD_DETAILS;
  payload: TCardDetails;
}

interface ILoadingAction {
  type: ModalsActionsEnum.SHOW_LOADING;
  payload: TLoading;
}

interface IMetamaskInfoAction {
  type: ModalsActionsEnum.SHOW_METAMASK_INFO;
  payload: TMetamaskInfo;
}

interface ITelegramInfoAction {
  type: ModalsActionsEnum.SHOW_TELEGRAM_INFO;
  payload: TTelegramInfo;
}

export type TModalsAction =
  | ICardDetailsAction
  | ILoadingAction
  | IMetamaskInfoAction
  | ITelegramInfoAction;
