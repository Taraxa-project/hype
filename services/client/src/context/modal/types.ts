import { CardData } from '../../components/card/Card';
import { HypeModalsActionsEnum } from './reducer';

export type THypeCardDetails = {
  open: boolean;
  cardData: CardData;
};

export type TInfo = {
  open: boolean;
  title?: string;
  text: string;
  onClose?: () => void;
};

export interface IHypeModalsStore {
  hypeDetails: THypeCardDetails;
  info: TInfo;
}

interface IHypeCardDetailsAction {
  type: HypeModalsActionsEnum.SHOW_HYPE_DETAILS;
  payload: THypeCardDetails;
}

interface IInfoAction {
  type: HypeModalsActionsEnum.SHOW_INFO;
  payload: TInfo;
}

export type THypeModalsAction = IHypeCardDetailsAction | IInfoAction;
