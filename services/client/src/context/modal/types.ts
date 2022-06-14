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

export type TDisconnectTelegram = {
  open: boolean;
  title: string;
  text: string;
  message?: string;
  username?: string;
  onDisconnect: (value?: any) => void;
};

export interface IModalsStore {
  hypeDetails: TCardDetails;
  loading: TLoading;
  metamaskInfo: TMetamaskInfo;
  telegramInfo: TTelegramInfo;
  disconnectTelegram: TDisconnectTelegram;
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

interface IDisconnectTelegramAction {
  type: ModalsActionsEnum.SHOW_DISCONNECT_TELEGRAM;
  payload: TDisconnectTelegram;
}

export type TModalsAction =
  | ICardDetailsAction
  | ILoadingAction
  | IMetamaskInfoAction
  | ITelegramInfoAction
  | IDisconnectTelegramAction;
