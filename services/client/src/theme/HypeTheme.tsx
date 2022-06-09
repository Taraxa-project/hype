import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../components/styles/Global';

export interface HypeColors {
  white: string;
  black: string;
  primary: string;
  success: string;
  danger: string;
  background: string;
  greys: string[];
}

type ButtonColor = {
  color: string;
  backgroundColor: string;
};

type CardColor = {
  color: string;
  background: string;
};

export interface HypeButtons {
  primary: ButtonColor;
  secondary: ButtonColor;
  danger: ButtonColor;
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

const breakpoints: HypeBreakpoints = {
  sm: '600px',
  md: '900px',
  lg: '1200px',
  xl: '1536px',
};

export interface HypeThemeType {
  colors: HypeColors;
  buttons: HypeButtons;
  cards: HypeCards;
  fontSizes: number[];
  space: number[];
  breakpoints: HypeBreakpoints;
}

const colors: HypeColors = {
  white: '#FFFFFF',
  black: '#000000',
  background: '#E5E5E5',
  primary: '#DDA25D',
  success: '#3E7E5C',
  danger: '',
  greys: [
    '#F1F1F1',
    '#FAFAFA',
    '#B1B1B1',
    '#2F2F2F',
    '#808080',
    '#ADADAD',
    '#292929',
    '#595959',
    '#A6A6A6',
  ],
};

const buttons: HypeButtons = {
  primary: {
    color: colors.white,
    backgroundColor: colors.primary,
  },
  secondary: {
    color: colors.white,
    backgroundColor: colors.success,
  },
  danger: {
    color: colors.white,
    backgroundColor: colors.danger,
  },
};

const cards: HypeCards = {
  lightCard: {
    color: colors.black,
    background: colors.greys[1],
  },
  darkCard: {
    color: colors.greys[7],
    background: colors.greys[0],
  },
};

const theme: HypeThemeType = {
  colors,
  buttons,
  cards,
  fontSizes: [12, 14, 16, 24, 32, 48, 64, 96, 128],
  space: [
    // margin and padding
    0, 4, 8, 16, 32, 64, 128, 256,
  ],
  breakpoints,
};

type HypeThemeProps = {
  children: React.ReactNode;
};

export const HypeThemeProvider = ({ children }: HypeThemeProps) => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        {children}
      </>
    </ThemeProvider>
  );
};
