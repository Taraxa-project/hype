import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { HypeThemeProvider } from './theme/HypeTheme';

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <HypeThemeProvider>{children}</HypeThemeProvider>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
