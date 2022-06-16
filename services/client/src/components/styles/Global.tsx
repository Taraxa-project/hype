import { createGlobalStyle } from 'styled-components';
import { HypeThemeType } from '../../theme';

const GlobalStyles = createGlobalStyle<{ theme: HypeThemeType }>`
  html {
    font-family: 'Inter';
    font-style: normal;
    font-size: 1rem;
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

  .datePicker input {
    width: 100% !important;
    box-sizing: border-box;

    border-radius: 0.75rem;
    border: 2px solid #e0e0e0;
    background: #fafafa;
    color: #595959;
    font-size: 1rem;
    width: 100%;
    min-height: 2.5rem;
    text-align: left;
    padding: 0.625rem;
    :focus,
    :active,
    :hover {
      border: 2px solid #eb8f4c;
      background: #f7f7f7;
    }
  
    :disabled {
      background: #f1f1f1;
      border: 0.063rem solid #e0e0e0;
      color: #e0e0e0;
    }
  }
`;

export default GlobalStyles;
