import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../components/styles/Global';
import { LightenColor } from './color-utils';
import { HypeBreakpoints, HypeColors, HypeButtons, HypeCards, HypeThemeType } from './types';

const breakpoints: HypeBreakpoints = {
  sm: '600px',
  md: '900px',
  lg: '1200px',
  xl: '1536px',
};

const colors: HypeColors = {
  white: '#FFFFFF',
  black: '#000000',
  background: '#E5E5E5',
  primary: '#DDA25D',
  secondary: '#E0E0E0',
  success: '#3E7E5C',
  info: '#0081CA',
  danger: '#F7614A',
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
    '#f7f7f7',
    '#ECECEC',
    '#787878',
    '#C2C2C2'
  ],
};

const buttons: HypeButtons = {
  primary: {
    color: colors.white,
    backgroundColor: colors.primary,
    hover: LightenColor(colors.primary)
  },
  secondary: {
    color: colors.greys[7],
    backgroundColor: colors.secondary,
    hover: LightenColor(colors.secondary)
  },
  success: {
    color: colors.white,
    backgroundColor: colors.success,
    hover: LightenColor(colors.success)
  },
  danger: {
    color: colors.black,
    backgroundColor: colors.danger,
    hover: LightenColor(colors.danger)
  },
  neutral: {
    color: colors.greys[7],
    backgroundColor: colors.secondary,
    hover: LightenColor(colors.secondary)
  }
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
