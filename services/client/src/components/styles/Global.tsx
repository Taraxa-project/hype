import { createGlobalStyle } from 'styled-components';
import { HypeThemeType } from '../../theme';

const GlobalStyles = createGlobalStyle<{ theme: HypeThemeType }>`
  html {
    font-family: 'Inter';
    font-style: normal;
    font-size: 16px;
  }

  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${({ theme }) => theme.colors.background};
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

export default GlobalStyles;
