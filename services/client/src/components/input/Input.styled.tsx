import styled from 'styled-components';
import { HypeThemeType } from '../../theme';

interface StyledInputProps {
  icon?: React.ReactNode;
  theme?: HypeThemeType;
}

export const StyledSearchIcon = styled.div`
  position: absolute;
  margin-top: 0.75rem;
  margin-left: 0.75rem;
`;

export const StyledInput = styled.input<StyledInputProps>`
  box-sizing: border-box;
  border-radius: 0.75rem;
  border: ${({ theme }) => `0.125rem solid ${theme.input.base.border}`};
  background: ${({ theme }) => theme.input.base.background};
  color: ${({ theme }) => theme.input.base.color};
  font-size: 1rem;
  width: 100%;
  min-height: 2.5rem;
  text-align: left;
  padding: 0.625rem;
  padding-left: ${({ icon }) => (icon ? '3rem;' : '')};

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
`;
