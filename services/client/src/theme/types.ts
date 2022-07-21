export interface HypeColors {
  white: string;
  black: string;
  primary: string;
  secondary: string;
  info: string;
  success: string;
  danger: string;
  background: string;
  greys: string[];
}

type ColorProps = {
  color: string;
  background: string;
  hover?: string;
  border?: string;
};

export interface HypeButtons {
  primary: ColorProps;
  secondary: ColorProps;
  success: ColorProps;
  danger: ColorProps;
}

export interface HypeFonts {
  default: string;
  primary: string;
}

export interface HypeCards {
  lightCard: ColorProps;
  darkCard: ColorProps;
}

export interface HypeBreakpoints {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface HypeInput {
  base: ColorProps;
  disabled: ColorProps;
  hover: ColorProps;
}

export interface HypeThemeType {
  colors: HypeColors;
  buttons: HypeButtons;
  cards: HypeCards;
  fonts: HypeFonts;
  fontSizes: number[];
  space: number[];
  breakpoints: HypeBreakpoints;
  input: HypeInput;
}
