import styled from 'styled-components';

import { HypeThemeType } from '../../theme';

interface CustomStyledProps {
  theme?: HypeThemeType;
  disabled?: boolean;
}

interface SwitchProps {
  disabled?: boolean;
}

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

export const Switch = styled.div<SwitchProps>`
  position: relative;
  width: 60px;
  height: 28px;
  background: ${props => props.disabled ? '#ddd' : '#b3b3b3'};
  border-radius: 32px;
  padding: 4px;
  transition: 300ms all;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

  &:before {
    transition: 300ms all;
    content: '';
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 35px;
    top: 50%;
    left: 4px;
    background: ${props => props.disabled ? '#bbb' : 'white'};
    transform: translate(0, -50%);
  }
`;

export const Input = styled.input<CustomStyledProps>`
  opacity: 0;
  position: absolute;

  &:checked + ${Switch} {
    background: ${({ theme, disabled }) =>  disabled ? ' #ececec' : theme.colors.primary};

    &:before {
      transform: translate(32px, -50%);
    }
  }
`;
