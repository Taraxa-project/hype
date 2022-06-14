export interface HypeColors {
  white: string;
  black: string;
  primary: string;
  secondary: string;
  success: string;
  danger: string;
  background: string;
  greys: string[];
}

type ButtonColor = {
  color: string;
  backgroundColor: string;
  hover?: string;
};

type CardColor = {
  color: string;
  background: string;
};

export interface HypeButtons {
  primary: ButtonColor;
  secondary: ButtonColor;
  success: ButtonColor;
  danger: ButtonColor;
  neutral: ButtonColor;
}

export interface HypeCards {
  lightCard: CardColor;
  darkCard: CardColor;
}

export interface HypeBreakpoints {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface HypeThemeType {
  colors: HypeColors;
  buttons: HypeButtons;
  cards: HypeCards;
  fontSizes: number[];
  space: number[];
  breakpoints: HypeBreakpoints;
}
