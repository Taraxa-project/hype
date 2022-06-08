import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../components/styles/Global';

export interface HypeThemeType {
  colors: {
    primary: string;
    success: string;
    neutral: string;
    button: string;
    body: string;
    cardBackground: string;
  };
}

const theme: HypeThemeType = {
  colors: {
    primary: '#DDA25D',
    success: '#3E7E5C',
    neutral: '#F1F1F1',
    button: '#dda25d',
    body: '#ececec',
    cardBackground: '#FAFAFA',
  },
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
