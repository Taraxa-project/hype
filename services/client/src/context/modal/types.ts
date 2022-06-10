import { CardData } from '../../components/card/Card';
import { ModalsActionsEnum } from './reducer';

export type TCardDetails = {
  open: boolean;
  cardData: CardData;
};

export type TInfo = {
  open: boolean;
  title?: string;
  text: string;
  onClose?: () => void;
};

export interface IModalsStore {
  hypeDetails: TCardDetails;
  info: TInfo;
}

interface ICardDetailsAction {
  type: ModalsActionsEnum.SHOW_CARD_DETAILS;
  payload: TCardDetails;
}

interface IInfoAction {
  type: ModalsActionsEnum.SHOW_INFO;
  payload: TInfo;
}

export type TModalsAction = ICardDetailsAction | IInfoAction;
