import styled from 'styled-components';
import { HypeThemeType } from '../../theme';
import { ButtonVariant } from '../../utils';

export const StyledButton = styled.button<{
  variant?: ButtonVariant;
  size?: 'small' | 'regular' | 'full-width';
  theme?: HypeThemeType;
}>`
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.75rem;
  border: ${({ variant }) => (variant === 'primary' ? 'none' : '0.063rem solid #C2C2C2')};
  background: ${({ variant, theme }) => theme.buttons[variant].background};
  color: ${({ variant, theme }) => theme.buttons[variant].color};
  font-size: 1rem;
  padding: ${({ size }) => (size === 'small' ? '1rem 0.5rem' : '1rem 4.5rem')};
  ${({ size }) => size === 'full-width' && 'width: 100%;'}
  cursor: pointer;

  :hover {
    background: ${({ variant, theme }) => theme.buttons[variant].hover};
  }

  :disabled {
    background: #ececec;
    border: 0.063rem solid #e0e0e0;
    color: #c2c2c2;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 1rem 0.5rem;
  }
`;
