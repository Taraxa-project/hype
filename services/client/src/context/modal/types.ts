import { ModalAction } from '../../components/modals/modal-container/ModalContainer';
import { HypePool } from '../../models';
import { NotificationType } from '../../utils';
import { ModalsActionsEnum } from './reducer';

export type TCardDetails = {
  open: boolean;
  cardData: HypePool;
  cardModalAction?: ModalAction;
  isPrivate?: boolean;
};

export type TLoading = {
  open: boolean;
  title: string;
  text: string[];
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

export type TNotification = {
  open: boolean;
  type: NotificationType;
  message: string[];
  title?: string;
};

export type TPoolCreated = {
  open: boolean;
  pool: Pick<HypePool, 'title' | 'projectName' | 'token'>;
};

export interface IModalsStore {
  hypeDetails: TCardDetails;
  loading: TLoading;
  metamaskInfo: TMetamaskInfo;
  telegramInfo: TTelegramInfo;
  disconnectTelegram: TDisconnectTelegram;
  notification: TNotification;
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

interface TNotificationAction {
  type: ModalsActionsEnum.SHOW_NOTIFICATION;
  payload: TNotification;
}

export type TModalsAction =
  | ICardDetailsAction
  | ILoadingAction
  | IMetamaskInfoAction
  | ITelegramInfoAction
  | IDisconnectTelegramAction
  | TNotificationAction;
