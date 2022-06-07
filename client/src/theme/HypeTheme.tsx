import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../components/styles/Global';

export interface HypeThemeType {
  colors: {
    button: string;
    body: string;
  };
}

const theme: HypeThemeType = {
  colors: {
    button: '#dda25d',
    body: '#ececec',
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
