import styled from 'styled-components';
import { HypeThemeType } from '../../theme';

export const StyledTextArea = styled.textarea<{ theme: HypeThemeType }>`
  box-sizing: border-box;
  border-radius: 0.75rem;
  border: ${({ theme }) => `0.125rem solid ${theme.input.base.border}`};
  background: ${({ theme }) => theme.input.base.background};
  color: ${({ theme }) => theme.input.base.color};
  font-size: 1rem;
  width: 100% !important;
  min-height: 2.5rem;
  text-align: left;
  padding: 0.625rem;
  font-family: Inter, sans-serif;

  :focus,
  :active,
  :hover {
    border: ${({ theme }) => `0.125rem solid ${theme.input.hover.border}`};
    background: ${({ theme }) => theme.input.hover.background};
  }

  :disabled {
    background: ${({ theme }) => theme.input.disabled.background};
    border: ${({ theme }) => `0.063rem solid ${theme.input.disabled.border}`};
    color: ${({ theme }) => theme.input.disabled.color};
  }

  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.greys[16]};
  }
  :-ms-input-placeholder {
    color: ${({ theme }) => theme.colors.greys[16]};
  }
`;
